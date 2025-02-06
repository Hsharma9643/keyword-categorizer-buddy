
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/7075dea4-9bc4-44e1-96cb-fc7658d573c8.png"
              alt="Adschoolmaster Logo"
              className="h-12 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-orange-500 transition-colors">
              Blog
            </Link>
            <Link to="/newsletter" className="text-gray-700 hover:text-orange-500 transition-colors">
              Newsletter
            </Link>
            <Link to="/learn-seo" className="text-gray-700 hover:text-orange-500 transition-colors">
              Learn SEO
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
