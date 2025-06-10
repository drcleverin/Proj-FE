
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    {
      icon: "🛡️",
      number: "28.01 Million",
      description: "Policies Issued"
    },
    {
      icon: "💰",
      number: "2.01 Million",
      description: "Claims Settled"
    },
    {
      icon: "🌐",
      number: "150+",
      description: "Network Garages As of Jan 3, 2025"
    },
    {
      icon: "⭐",
      number: "100%",
      description: "Nice Income provided As of Jan 31, 2025"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose our Product?</h2>
          <p className="text-insurance-primary font-semibold">Insurance product prices read</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <h3 className="text-2xl font-bold text-insurance-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
