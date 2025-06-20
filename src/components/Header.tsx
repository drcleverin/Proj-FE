
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = user?.role;

  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const redirectToChat = (): void => {
        if (user.role === "CUSTOMER") {
            window.location.href = `http://localhost:5173/`;
        }else {
            alert("Only customers can access this feature.");
        }
      
 };
 


  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-insurance-primary hover:text-insurance-dark transition-colors">
            Buddies Insurance
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-insurance-primary transition-colors bg-transparent data-[state=open]:bg-accent px-2 py-1 rounded-sm hover:bg-accent/50">
                    Policy
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-4 w-[400px] bg-background border border-border rounded-md shadow-lg">
                      <Link
                        to="/policy?type=health"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Health Insurance</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Comprehensive health coverage for individuals and families
                        </p>
                      </Link>
                      <Link
                        to="/policy?type=motor"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Motor Insurance</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Complete protection for your car and bike
                        </p>
                      </Link>
                      <Link
                        to="/policy?type=product"
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
            
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-foreground hover:text-insurance-primary transition-colors">
                  My Policies
                </Link>
                <Link to="/support" className="text-foreground hover:text-insurance-primary transition-colors">
                  Support
                </Link>
                <Link to="/blogs" className="text-foreground hover:text-insurance-primary transition-colors">
                  Blogs
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              {role === "CUSTOMER" ? <Button id="csrChatBtn" onClick={redirectToChat}>CSR Chat</Button> : null}
              <DropdownMenuTrigger asChild>
              {/* <Button id="csrChatBtn" onClick={redirectToChat}>CSR Chat</Button> */}

                <Button variant="ghost" className="relative h-8 w-8 rounded-full">

                  <User className="h-4 w-4" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border border-border" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.username}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email || 'No email available'}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role?.toLowerCase()}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="w-full cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent> 
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
          

              {location.pathname !== "/login" && (
                <Button asChild variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
              )}
              {location.pathname !== "/register" && (
                <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
              )}
              
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
