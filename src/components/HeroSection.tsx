
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchPolicy, setSearchPolicy] = useState("");
  const navigate = useNavigate();

  const handleGetQuote = () => {
    if (searchPolicy) {
      navigate(`/policy?type=${searchPolicy}`);
    } else {
      navigate("/policy");
    }
  };

  return (
    <section className="relative min-h-[600px] hero-section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Protect Your Car While
              <br />
              <span className="text-insurance-accent">Protecting Your Wallet</span>
            </h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md">
              <Select value={searchPolicy} onValueChange={setSearchPolicy}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Search Policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motor">Motor Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="product">Product Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 text-center">Ready to get protected?</p>
                  <Button 
                    onClick={handleGetQuote}
                    className="w-full bg-insurance-primary hover:bg-insurance-dark"
                  >
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-insurance-accent/20 to-transparent rounded-3xl"></div>
              <img
                src="public/carImg.jpg"
                alt="Luxury Car"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
