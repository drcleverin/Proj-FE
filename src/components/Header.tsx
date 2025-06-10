
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-insurance-primary">
            Buddies Insurance
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/policy" className="text-gray-600 hover:text-insurance-primary transition-colors">
              Policy
            </Link>
            <Link to="/claim" className="text-gray-600 hover:text-insurance-primary transition-colors">
              Claim
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-insurance-primary transition-colors">
              Support
            </Link>
            <Link to="/blogs" className="text-gray-600 hover:text-insurance-primary transition-colors">
              Blogs
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="border-insurance-primary text-insurance-primary hover:bg-insurance-light">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
