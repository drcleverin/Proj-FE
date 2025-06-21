

// src/components/MotorInsurance.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { Car, Shield, Wrench, Users } from "lucide-react";

const MotorInsurance = () => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    registrationNumber: "",
    make: "",
    model: "",
    year: ""
  });

  // No fetch calls or backend integration for this component's form in this update,
  // as the backend doesn't have a specific API for "Get Instant Quote" for motor insurance.
  // The form remains client-side only.

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-insurance-primary" />,
      title: "Comprehensive Coverage",
      description: "Protection against accidents, theft, and natural disasters"
    },
    {
      icon: <Wrench className="h-8 w-8 text-insurance-primary" />,
      title: "Cashless Repairs",
      description: "Network of 4000+ authorized garages across India"
    },
    {
      icon: <Users className="h-8 w-8 text-insurance-primary" />,
      title: "24/7 Roadside Assistance",
      description: "Emergency support wherever you are"
    },
    {
      icon: <Car className="h-8 w-8 text-insurance-primary" />,
      title: "Zero Depreciation",
      description: "Get full claim amount without depreciation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Motor Insurance</h1>
          <p className="text-xl text-gray-600">Comprehensive protection for your vehicle</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Quote Form */}
          <Card>
            <CardHeader>
              <CardTitle>Get Instant Quote</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                <Select onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="commercial">Commercial Vehicle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Registration Number</label>
                <Input
                  placeholder="e.g., KA01AB1234"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Make</label>
                  <Select onValueChange={(value) => setFormData({...formData, make: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <Select onValueChange={(value) => setFormData({...formData, year: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                Get Quote
              </Button>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Why Choose Our Motor Insurance?</h2>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Types */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Coverage Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Third Party</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Basic coverage as per law</p>
                <ul className="space-y-2 text-sm">
                  <li>• Third party liability</li>
                  <li>• Personal accident cover</li>
                  <li>• Legal compliance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="ring-2 ring-insurance-primary">
              <CardHeader>
                <CardTitle>Comprehensive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Complete protection</p>
                <ul className="space-y-2 text-sm">
                  <li>• Own damage cover</li>
                  <li>• Third party liability</li>
                  <li>• Theft protection</li>
                  <li>• Natural disasters</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zero Depreciation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Maximum claim amount</p>
                <ul className="space-y-2 text-sm">
                  <li>• No depreciation on parts</li>
                  <li>• Full claim settlement</li>
                  <li>• Premium coverage</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorInsurance;
