import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <br /><br />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Services & Pricing</h1>

        <p className="text-gray-600 mb-6">
          At <strong>GoBuild</strong>, we provide skilled workers for construction and home improvement services at transparent daily pricing.
          All listed prices apply to a standard <strong>8-hour workday</strong>.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-b">Service / Worker Type</th>
                <th className="p-3 text-left border-b">Price (Per Day)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Carpenter", price: "₹850/day" },
                { name: "Mason", price: "₹850/day" },
                { name: "Helper", price: "₹650/day" },
                { name: "Painter", price: "₹700/day" },
                { name: "Welder", price: "₹1200/day" },
                { name: "Labour", price: "₹650/day" },
                { name: "Steel Cutter", price: "₹850/day" },
                { name: "Tiles & Floor Work Specialist", price: "₹1000/day" },
                { name: "Plumber", price: "₹1200/day" },
                { name: "Electrician", price: "₹1200/day" },
              ].map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{service.name}</td>
                  <td className="p-3 border-b font-medium">{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 space-y-4 text-gray-600">
          <h2 className="font-semibold text-lg">Please Note:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pricing applies for <strong>one worker for 8 hours/day</strong>.</li>
            <li>Overtime may incur additional charges.</li>
            <li>Material cost is not included in the service rate.</li>
            <li>Pricing may vary based on location, urgency, or availability.</li>
            <li>Taxes (GST) may apply based on final invoice.</li>
          </ul>
        </div>

        <p className="mt-8 text-gray-700">
          For long-term, bulk hiring or contract-based projects, contact us at:
          <br />
          <span className="font-semibold">admin@gobuild.in</span> | <span className="font-semibold">+91-8899310111</span>
        </p>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
