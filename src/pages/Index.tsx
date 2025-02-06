import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";

// Pattern matching rules for classification
const patterns = {
  exploratory: /(tell me about|explain|what are|describe) .*/i,
  creative: /(ideas?|creative|inspiration|brainstorm|imagine|design|innovative|unique ways|suggest|come up with|story ideas?|writing prompts?|artistic|inventive)/i,
  confirmation: /^(is it true|confirm|verify|did|actually|really|can you confirm|has.*been|have.*been|was.*done|were.*done|can (you )?confirm)/i,
  technical: /(?<!can you )(fix|specifications?|technical|troubleshoot|error|bug|issue|protocol|software|hardware|driver|system|network|server|database|code|programming|computer|laptop|device|mobile|desktop|app(lication)?|website|browser|interface|configuration|setup|install(ation)?|upgrade|update|patch|version|compatibility|performance|bandwidth|memory|storage|cpu|processor|gpu|graphics|resolution|screen|display|audio|sound|video|wireless|wifi|bluetooth|usb|port|cable|connection|sync|backup|restore|recovery|crash|freeze|hang|slow|fast|speed|boot|startup|shutdown|login|logout|password|security|firewall|antivirus|malware|virus|spam|hack|encryption|decryption|authentication|authorization|permission|access|user|admin|root|command|terminal|console|log|debug|trace|monitor|analyze|diagnose|test|benchmark|optimize|tune|configure|settings?|preferences?|options?|menu|toolbar|taskbar|desktop|folder|file|directory|path|url|link|address|domain|hosting|server|client|api|framework|library|module|package|dependency|component|function|method|class|object|variable|data|input|output|parameter|argument|return|value|type|format|syntax|language|compiler|interpreter|runtime|environment|platform|operating system|os|windows|mac|linux|unix|android|ios|mobile|web|cloud|local|remote|online|offline|download|upload|stream|buffer|cache|temporary|permanent|volatile|static|dynamic|synchronous|asynchronous|parallel|sequential|concurrent|thread|process|service|daemon|background|foreground|frontend|backend|full[ -]?stack|database|sql|nosql|index|query|crud|rest|soap|xml|json|html|css|javascript|typescript|python|java|cpp?|ruby|php|perl|shell|bash|powershell|cmd|git|svn|mercurial|docker|kubernetes|aws|azure|gcp|cloud|saas|paas|iaas|virtualization|container|image|instance|cluster|node|pod|deployment|service|ingress|egress|load[ -]?balancer|proxy|gateway|router|switch|hub|modem|isp|dns|dhcp|ip|tcp|udp|http[s]?|ftp|ssh|telnet|vpn|ssl|tls|encryption|hash|token|session|cookie|cache|api[ -]?key|oauth|jwt|cors|xss|csrf|sql[ -]wall|security|vulnerability|patch|hotfix|workaround|solution|resolution|fix|repair|maintain|support|help desk|ticket|incident|problem|known issue|bug|defect|feature|enhancement|requirement|specification|documentation|manual|guide|tutorial|walkthrough|step[s]?|instruction[s]?|direction[s]?|procedure[s]?|process|flow|diagram|architecture|design|pattern|best practice|standard|convention|guideline|policy|rule|regulation|compliance|audit|review|assessment|evaluation|analysis|report|metric|measurement|monitoring|alerting|notification|warning|error|exception|failure|success|status|health|check|validation|verification|testing|qa|quality|assurance|control|management|governance|strategy|planning|roadmap|milestone|deadline|schedule|timeline|project|program|portfolio|resource|budget|cost|price|license|subscription|contract|agreement|terms|conditions|policy|legal|compliance|regulation|standard|certification|accreditation|audit|review|assessment|evaluation|analysis|report)/i,
  emotional: /(how to (deal|cope) with|what to (say|do) .*(grief|grieving|sad|anxious|depressed|lonely)|feeling (sad|anxious|depressed|lonely|overwhelmed)|mental health|emotional|therapy|counseling|grief|anxiety|depression|stress|trauma|support group|self-care|meditation|mindfulness|healing|relationship advice|heartbreak|breakup|emotions|worried|upset|panic|fear)/i,
  historical: /(history|historical|past|when was|ancient|origin|caused.*war|world war|empire|civilization|century|decade|era|dynasty|period|timeline|heritage)/i,
  boolean: /^(is|are|can|does|do|will|should|has|have)(?!.*(true|confirm|verify|actually|really))/i,
  consequence: /(what happens|effect|impact|result|outcome|consequence)/i,
  instruction: /(how to(?! (deal|cope) with)|steps|guide|tutorial|process|way to|improve|enhance|boost|increase|optimize|master|learn|tips|advice|benefits|advantages)/i,
  scientific: /(theory|scientific|physics|chemistry|biology|hypothesis|experiment|quantum|molecule|atom|cell|evolution|science|laboratory)(?!.*(story|fiction|creative|ideas?|inspiration))/i,
  definition: /(what is|define|meaning|definition|explain|describe)/i,
  reason: /(why|reason|cause|explain why)/i,
  shortFact: /(where|who|which|what(?! (to|is))|how many|how much)/i,
  opinion: /(best|better|worst|should i|recommend|review)/i,
  prediction: /(will|future|predict|forecast|upcoming|next)/i,
  personal: /(my|for me|personal|individual|your|yourself|mine|our|we|us)/i,
  comparison: /(vs|versus|compared to|difference between|better|which is better|compare)/i,
  location: /(near|nearby|distance|location|directions|where is|closest)/i,
  temporal: /(when(?! was)|how long|schedule|duration|time|hours|minutes|days)/i,
  hypothetical: /(what if|if|suppose|hypothetically|assuming|imagine)/i,
  opinionVsFact: /(is it true|actually|really|fact|prove|evidence|opinion|think|feel about)/i,
  procedural: /(process|steps|procedure|sequence|how to|method|way to)/i,
  entertainment: /(fun|game|play|movie|show|music|song|book|novel|story|fiction|entertainment|hobby|leisure|recreation|sport|activity)/i,
  cultural: /(culture|tradition|custom|ritual|belief|religion|society|community|language|art|music|dance|food|cuisine|festival|celebration|holiday|ceremony|practice)/i,
  other: /.*/
};

const classifyKeyword = (keyword: string): QueryIntent => {
  // Convert to lowercase for consistent matching
  const processedKeyword = keyword.toLowerCase().trim();
  
  // Check each pattern and return the first match
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(processedKeyword)) {
      return intent as QueryIntent;
    }
  }
  
  // Default to "other" if no patterns match
  return "other";
};

const Index = () => {
  const [results, setResults] = useState<KeywordResult[]>([]);

  const handleAnalyze = (keywords: string[]) => {
    const classified = keywords.map((keyword) => ({
      keyword,
      intent: classifyKeyword(keyword),
    }));
    setResults(classified);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Keyword Intent Classifier</h1>
            <p className="text-muted-foreground">
              Enter your keywords below to analyze their search intent using pattern matching
            </p>
          </div>

          <KeywordInput onAnalyze={handleAnalyze} />

          {results.length > 0 && <ResultsDisplay results={results} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
