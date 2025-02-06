
import { Separator } from "./ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-[#1A1F2C] text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/ca156a4f-b814-40ad-be47-5de7bacb20a4.png"
              alt="Adschoolmaster Logo"
              className="h-16 w-auto"
            />
            <p className="text-sm text-gray-300">
              SEO focused, Simplified Digital Marketing Training and Consulting
            </p>
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
              <li>
                <a 
                  href="https://www.adschoolmaster.com/contact/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/privacy-policy/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adschoolmaster.com/terms/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
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
        <div className="text-center text-sm text-gray-300">
          <p>&copy; {currentYear} AdSchoolMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
