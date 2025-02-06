
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.adschoolmaster.com"
            className="flex items-center"
          >
            <img
              src="/lovable-uploads/7075dea4-9bc4-44e1-96cb-fc7658d573c8.png"
              alt="Adschoolmaster Logo"
              className="h-16 w-auto" // Increased from h-12 to h-16
            />
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="https://www.adschoolmaster.com/about/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              About
            </a>
            <a 
              href="https://www.adschoolmaster.com/blog/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://www.adschoolmaster.com/newsletter/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Newsletter
            </a>
            <a 
              href="https://www.adschoolmaster.com/seo-course/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Learn SEO
            </a>
            <a 
              href="https://www.adschoolmaster.com/contact/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
