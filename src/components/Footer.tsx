
import { Separator } from "./ui/separator";
import { Facebook, Linkedin, Youtube, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-[#1A1F2C] text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <a 
              href="https://www.adschoolmaster.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="/lovable-uploads/ca156a4f-b814-40ad-be47-5de7bacb20a4.png"
                alt="Adschoolmaster Logo"
                className="h-20 w-auto"
              />
            </a>
            <p className="text-sm text-gray-300">
              SEO focused, Simplified Digital Marketing Training and Consulting
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/school/adschoolmaster/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Linkedin size={24} className="text-white" />
              </a>
              <a 
                href="https://www.facebook.com/AdSchoolMaster/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook size={24} className="text-white" />
              </a>
              <a 
                href="https://www.youtube.com/c/AdSchoolMaster"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Youtube size={24} className="text-white" />
              </a>
              <a 
                href="https://x.com/adschoolmaster?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Twitter size={24} className="text-white" />
              </a>
              <a 
                href="https://www.instagram.com/adschoolmaster/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram size={24} className="text-white" />
              </a>
            </div>
          </div>

          {/* Learn Section */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Learn</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.adschoolmaster.com/blog/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/seo-quiz/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  SEO Quiz
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/newsletter/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/digital-marketing-course-gurgaon/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Digital Marketing Course
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://seo-keyword-classifier-tool.netlify.app/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  SEO Tool
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/seo-course/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  SEO Marketing Course 1.0
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/a-z-seo-glossary/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  SEO Glossary
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.adschoolmaster.com/about/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/seo-consulting/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  SEO Consulting
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/contact/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <Separator className="my-8 bg-gray-700" />
        <div className="flex justify-between items-center text-sm text-gray-300">
          <p>© 2017-2025 - ADSCHOOLMASTER is a Subsidiary of BirdMatrix LLP (ID No. AAY-2584)</p>
          <div className="space-x-4">
            <a 
              href="https://www.adschoolmaster.com/privacy-policy/" 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="https://www.adschoolmaster.com/terms-of-service/" 
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
