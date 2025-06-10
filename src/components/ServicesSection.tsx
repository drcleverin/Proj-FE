
import { Card, CardContent } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      title: "Dependable",
      description: "We continue to play a vital role every day",
      details: "For individuals living conditions like Galicia exposure or times, accidents like a tornado, electrical, we have always stood by our customer's support with our comprehensive claims and professional leadership practices for nearly two decades",
      image: "/placeholder.svg"
    },
    {
      title: "Approachable",
      description: "Voice of the clients is what makes every move when we make a service for your home or in India as we take all of ourselves with clients before coming closer to them. We also have professional trained professionals and experts to guide you through the process of making your changes on making our claims. Any questions you have or any help you need – just reach out to us.",
      image: "/placeholder.svg"
    },
    {
      title: "Transparent",
      description: "Insurance products are designed and priced through transparency, a no-jargon content, and a no-lie-cost to you. A simple meaning, from policy guidance in suitability to claims, you can count on us for keeping it simple. From policy to claim, you can count on us to get you to the right place. We're able to do active support.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why choose us?</h2>
        
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.details}</p>
                {service.title === "Approachable" && (
                  <div className="bg-insurance-light p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-insurance-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AI</span>
                      </div>
                      <span className="font-semibold">Ask our AI</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <img
                  src="/placeholder.svg"
                  alt={service.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
