
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const Dashboard = () => {
  const policies = [
    {
      id: "HEALTH9876543210",
      type: "Comprehensive Health Plan - Family Floater",
      insured: "The Sharma Family (Rajesh, Priya, Rohan, Siya)",
      effectiveDate: "01 Jan 2025",
      expiryDate: "31 Dec 2025",
      premium: "₹18,500",
      status: "Active",
      icon: "💊"
    },
    {
      id: "MOTOR1234567890", 
      type: "Private Car Package Policy",
      insured: "KA01AB1234 - Maruti Swift (2020)",
      effectiveDate: "01 Jan 2025",
      expiryDate: "31 Dec 2025",
      premium: "₹12,500",
      status: "Expiring soon",
      icon: "🚗"
    },
    {
      id: "PROD5554443332",
      type: "Extended Warranty - Smart TV",
      insured: "Samsung 55\" Smart QLED TV",
      effectiveDate: "01 Jan 2025", 
      expiryDate: "31 Dec 2025",
      premium: "₹12,500",
      status: "Expiring soon",
      icon: "📺"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Policies</h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">15,000+ Insured</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            Your complete overview of all health, motor, and product policies. Manage details, check status, and renew with ease.
          </p>
          
          <div className="flex space-x-4 mb-8">
            <Button variant="default" className="bg-insurance-primary">All Policies</Button>
            <Button variant="outline">Motor</Button>
            <Button variant="outline">Health</Button>
            <Button variant="outline">Product</Button>
          </div>
        </div>

        <div className="space-y-6">
          {policies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{policy.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {policy.type}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">ID: {policy.id}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Insured:</span> {policy.insured}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Effective Date:</span>
                          <p className="font-medium">{policy.effectiveDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expiry Date:</span>
                          <p className="font-medium text-red-600">{policy.expiryDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Annual Premium:</span>
                          <p className="font-medium">{policy.premium}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <Badge 
                      variant={policy.status === "Active" ? "default" : "secondary"}
                      className={policy.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {policy.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Policy</Button>
                      <Button size="sm" className="bg-insurance-primary hover:bg-insurance-dark">
                        Renew Policy
                      </Button>
                      <Button variant="outline" size="sm">Make a Claim</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
