
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { Smartphone, Laptop, Home, Camera } from "lucide-react";

const ProductInsurance = () => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const productCategories = [
    {
      icon: <Smartphone className="h-12 w-12 text-insurance-primary" />,
      title: "Mobile & Electronics",
      description: "Smartphones, tablets, earphones",
      coverage: "Accidental damage, liquid damage, theft"
    },
    {
      icon: <Laptop className="h-12 w-12 text-insurance-primary" />,
      title: "Laptops & Computers",
      description: "Laptops, desktops, accessories",
      coverage: "Hardware failure, accidental damage"
    },
    {
      icon: <Home className="h-12 w-12 text-insurance-primary" />,
      title: "Home Appliances",
      description: "TV, refrigerator, washing machine",
      coverage: "Breakdown, electrical surge, repair"
    },
    {
      icon: <Camera className="h-12 w-12 text-insurance-primary" />,
      title: "Photography Equipment",
      description: "Cameras, lenses, drones",
      coverage: "Accidental damage, theft, breakdown"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Insurance</h1>
          <p className="text-xl text-gray-600">Extended warranty and protection for your valuable products</p>
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-3">{category.description}</p>
                <p className="text-sm text-insurance-primary font-semibold">{category.coverage}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Insurance Form */}
          <Card>
            <CardHeader>
              <CardTitle>Get Product Insurance Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Category</label>
                <Select onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile & Electronics</SelectItem>
                    <SelectItem value="laptop">Laptops & Computers</SelectItem>
                    <SelectItem value="appliance">Home Appliances</SelectItem>
                    <SelectItem value="camera">Photography Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Input placeholder="e.g., Apple, Samsung, Sony" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <Input placeholder="e.g., iPhone 15, MacBook Pro" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Purchase Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Product Value</label>
                  <Input placeholder="₹50,000" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Coverage Period</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                Calculate Premium
              </Button>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">What's Covered?</h2>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-green-700 mb-3">✓ Covered</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Accidental damage including drops and spills</li>
                  <li>• Liquid damage and water exposure</li>
                  <li>• Electrical and mechanical breakdown</li>
                  <li>• Theft and burglary</li>
                  <li>• Screen damage and internal component failure</li>
                  <li>• Power surge damage</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-red-700 mb-3">✗ Not Covered</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Intentional damage</li>
                  <li>• War, nuclear risks</li>
                  <li>• Normal wear and tear</li>
                  <li>• Cosmetic damage not affecting functionality</li>
                  <li>• Damage due to software issues</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Simple Claim Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Report Damage</h3>
              <p className="text-gray-600">Call our helpline or file claim online</p>
            </div>
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Assessment</h3>
              <p className="text-gray-600">Our expert will assess the damage</p>
            </div>
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Approval</h3>
              <p className="text-gray-600">Quick claim approval process</p>
            </div>
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">Repair/Replace</h3>
              <p className="text-gray-600">Get your product repaired or replaced</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInsurance;
