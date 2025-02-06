
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.adschoolmaster.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src="/lovable-uploads/7075dea4-9bc4-44e1-96cb-fc7658d573c8.png"
              alt="Adschoolmaster Logo"
              className="h-12 w-auto"
            />
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="https://www.adschoolmaster.com/about/"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              About
            </a>
            <a 
              href="https://www.adschoolmaster.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Blog
            </a>
            <a 
              href="https://www.adschoolmaster.com/newsletter/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Newsletter
            </a>
            <a 
              href="https://www.adschoolmaster.com/seo-course/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Learn SEO
            </a>
            <a 
              href="https://www.adschoolmaster.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
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

