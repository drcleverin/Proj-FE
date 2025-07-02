 
import { Card, CardContent } from "@/components/ui/card";
 
const ServicesSection = () => {
  const services = [
    {
      title: "Dependable",
      description: "For individuals living conditions like Galicia exposure or times, accidents like a tornado, electrical, we have always stood by our customer's support with our comprehensive claims and professional leadership practices for nearly two decades",
      details: "For individuals living conditions like Galicia exposure or times, accidents like a tornado, electrical, we have always stood by our customer's support with our comprehensive claims and professional leadership practices for nearly two decades",
      image: "https://res.cloudinary.com/dg9itycrz/image/upload/v1750692089/ChatGPT_Image_Jun_23_2025_08_46_37_PM_dhdme8.png"
    },
    {
      title: "Approachable",
      description: "We continue to play a vital role every day as an AI support system, providing you with the information you need to make informed decisions about your insurance. Our AI is designed to be approachable and easy to use, ensuring that you can get the answers you need quickly and efficiently.",
      image: "https://res.cloudinary.com/dg9itycrz/image/upload/v1750692370/ChatGPT_Image_Jun_23_2025_08_55_57_PM_u0jww7.png"
    },
    {
      title: "Transparent",
      description: "Insurance products are designed and priced through transparency, a no-jargon content, and a no-lie-cost to you. A simple meaning, from policy guidance in suitability to claims, you can count on us for keeping it simple. From policy to claim, you can count on us to get you to the right place. We're able to do active support.",
      image: "https://res.cloudinary.com/dg9itycrz/image/upload/v1750691764/ChatGPT_Image_Jun_23_2025_08_42_51_PM_a8mnnb.png"
    }
  ];
 
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why choose us?</h2>
       
        <div className="space-y-16 justify-center">
          {services.map((service, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense mr-10' : ' ml-10'}`}>
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
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
                  src={service.image}
                  alt={service.title}
                  // className="w-90 h-60 object-cover rounded-lg shadow-lg pd-4"
                  className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1 w-90 h-60 object-cover rounded-lg shadow-lg pd-4 ml-10' : 'w-90 h-60 object-cover rounded-lg shadow-lg pd-4 ml-10'}`}
                 
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
 
 