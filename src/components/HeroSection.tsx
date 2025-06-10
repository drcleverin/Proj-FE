
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searchPolicy, setSearchPolicy] = useState("");

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Registration Number</label>
                    <Input
                      placeholder="PJ 01 DC 4877"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Mobile Number</label>
                    <Input
                      placeholder="97397 12345"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Email</label>
                    <Input
                      placeholder="abc@xyz.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                </div>
                <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-insurance-accent/20 to-transparent rounded-3xl"></div>
              <img
                src="/placeholder.svg"
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
