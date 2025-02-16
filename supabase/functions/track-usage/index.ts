
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    
    // Check if IP exists and get usage count
    const { data: existingUsage } = await supabase
      .from('anonymous_usage')
      .select('*')
      .eq('ip_address', clientIP)
      .single()

    if (!existingUsage) {
      // First time user
      const { data, error } = await supabase
        .from('anonymous_usage')
        .insert([{ ip_address: clientIP }])
        .select()
        .single()

      if (error) throw error
      
      return new Response(
        JSON.stringify({ requiresAuth: false, usageCount: 1 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update existing usage
    const newCount = existingUsage.usage_count + 1
    const { error: updateError } = await supabase
      .from('anonymous_usage')
      .update({ 
        usage_count: newCount,
        last_used_at: new Date().toISOString()
      })
      .eq('ip_address', clientIP)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ 
        requiresAuth: newCount > 5,
        usageCount: newCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
