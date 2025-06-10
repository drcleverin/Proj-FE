
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-insurance-primary">
            Buddies Insurance
          </Link>
          <nav className="hidden md:flex space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-insurance-primary">
                    Policy
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-insurance-light to-insurance-primary p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Insurance Plans
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Comprehensive coverage for all your needs
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/health-insurance"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Health Insurance</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Comprehensive health coverage for individuals and families
                        </p>
                      </Link>
                      <Link
                        to="/motor-insurance"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Motor Insurance</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Complete protection for your car and bike
                        </p>
                      </Link>
                      <Link
                        to="/product-insurance"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Product Insurance</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Extended warranty for electronics and appliances
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
