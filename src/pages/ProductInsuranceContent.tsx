// src/components/ProductInsuranceContent.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Laptop, Home, Camera, Shield } from "lucide-react";
import { Navigate, Link } from 'react-router-dom';

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


    <div className="min-h-screen
bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Coming Soon Caption */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Product Insurance
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
          Coming Soon
        </p>

        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg"
        >
          Back to Home
        </Link>


      </div>
    </div>

  );
};

export default ProductInsuranceContent;