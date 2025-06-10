
const Footer = () => {
  const footerSections = [
    {
      title: "Insurance",
      links: ["Motor Insurance", "Health Insurance", "Product Insurance"]
    },
    {
      title: "Services", 
      links: ["Customer Support", "Retrieve quote", "Track Claim", "Live Chat", "Renew your policy", "Customer Feedback"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "General Terms&Conditions", "Motor Third Party Claims"]
    },
    {
      title: "About Us",
      links: ["Overview", "Promoters", "CSR"]
    }
  ];

  return (
    <footer className="bg-insurance-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Buddies Insurance</h3>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-insurance-light hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-insurance-secondary mt-8 pt-8 text-center">
          <p className="text-insurance-light">&copy; 2025 Buddies Insurance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
