
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      title: "Car",
      features: [
        "Doorstep cashless repair & claims services",
        "Zero-based plans for low mileage drivers",
        "AI-focused instant claims process"
      ]
    },
    {
      title: "Health", 
      features: [
        "Cashless healthcare services at your doorstep",
        "Customized Plans based on Medical History",
        "Instant Claim processing"
      ]
    },
    {
      title: "Product",
      features: [
        "On-the-Repair & Replacement Services",
        "Usage-Based Premiums for Low Risk Items",
        "Smart AI-Assisted Claims Approval"
      ]
    }
  ];

  return (
    <section className="py-16 insurance-gradient">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Products</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="text-insurance-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-insurance-primary hover:bg-insurance-dark">
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
