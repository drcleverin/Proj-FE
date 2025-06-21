// src/components/ProductInsuranceContent.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Laptop, Home, Camera } from "lucide-react";

const ProductInsuranceContent: React.FC = () => {
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">{category.icon}</div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-3">{category.description}</p>
              <p className="text-sm text-insurance-primary font-semibold">{category.coverage}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Product Insurance Quote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Product Category</Label>
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
              <Label>Brand</Label>
              <Input placeholder="e.g., Apple, Samsung, Sony" />
            </div>

            <div>
              <Label>Model</Label>
              <Input placeholder="e.g., iPhone 15, MacBook Pro" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Purchase Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Product Value</Label>
                <Input placeholder="₹50,000" />
              </div>
            </div>

            <div>
              <Label>Coverage Period</Label>
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

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">What's Covered?</h3>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-green-700 mb-3">✓ Covered</h4>
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
              <h4 className="font-semibold text-red-700 mb-3">✗ Not Covered</h4>
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

      <Card>
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Simple Claim Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">1</span>
              </div>
              <h4 className="font-semibold mb-2">Report Damage</h4>
              <p className="text-muted-foreground">Call our helpline or file claim online</p>
            </div>
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">2</span>
              </div>
              <h4 className="font-semibold mb-2">Assessment</h4>
              <p className="text-muted-foreground">Our expert will assess the damage</p>
            </div>
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">3</span>
              </div>
              <h4 className="font-semibold mb-2">Approval</h4>
              <p className="text-muted-foreground">Quick claim approval process</p>
            </div>
            <div className="text-center">
              <div className="bg-insurance-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-insurance-primary">4</span>
              </div>
              <h4 className="font-semibold mb-2">Repair/Replace</h4>
              <p className="text-muted-foreground">Get your product repaired or replaced</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInsuranceContent;