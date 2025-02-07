
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b relative">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.adschoolmaster.com"
            className="flex items-center"
          >
            <img
              src="/lovable-uploads/7075dea4-9bc4-44e1-96cb-fc7658d573c8.png"
              alt="Adschoolmaster Logo"
              className="h-20 w-auto"
            />
          </a>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b md:hidden z-50">
              <div className="flex flex-col p-4 space-y-4">
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
                  href="https://app.adschoolmaster.com/"
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  SEO Intent Tool
                </a>
              </div>
            </div>
          )}
          
          {/* Desktop menu */}
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
              href="https://app.adschoolmaster.com/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              SEO Intent Tool
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

