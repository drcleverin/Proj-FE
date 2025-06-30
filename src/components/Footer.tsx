import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: "About Us", // Moved About Us to be the first content section
      links: [
        { text: "Overview", path: "/about/overview" },
        { text: "Promoters", path: "/about/promoters" },
        { text: "CSR", path: "/about/csr" }
      ]
    },
    {
      title: "Insurance",
      links: [
        { text: "Motor Insurance", path: "/policy?type=motor" },
        { text: "Health Insurance", path: "/policy?type=health" },
        { text: "Product Insurance", path: "/product-insurance" }
      ]
    },
    {
      title: "Services",
      links: [
        { text: "Customer Support", path: "/support" },
        { text: "Retrieve quote", path: "/retrieve-quote" },
        { text: "Track Claim", path: "/track-claim" },
        { text: "Live Chat", path: "/live-chat?openChat=true&fullScreen=true" },
        { text: "Renew your policy", path: "/renew-policy" },
        { text: "Customer Feedback", path: "/customer-feedback" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", path: "/legal/privacy-policy" },
        { text: "General Terms&Conditions", path: "/legal/terms-conditions" },
      ]
    }
  ];

  return (
    <footer className="bg-insurance-primary text-white py-12">
      <div className="container mx-auto px-4">
        {/* Buddies Insurance Branding Section - now separate */}
        <div className="mb-8 text-center md:text-left">
          <Link to="/" className="text-4xl font-extrabold text-white hover:text-insurance-light transition-colors">
            Buddies Insurance
          </Link>
          <p className="text-insurance-light mt-2 max-w-sm md:max-w-full mx-auto md:mx-0">
            Your trusted partner in securing your future.
          </p>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-t border-insurance-secondary pt-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-xl mb-4 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path} className="text-insurance-light hover:text-white transition-colors text-base block">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="border-t border-insurance-secondary mt-12 pt-8 text-center">
          <p className="text-insurance-light">&copy; 2025 Buddies Insurance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
