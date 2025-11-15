import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContractorForm from "@/components/ContractorForm";

const accentColor = "text-yellow-600";

const Contractors: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans relative">
      <Navbar />

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto w-full pt-20 mt-4 px-4 md:px-0 flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center justify-between w-full">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              <span className="text-black">Hire Reliable </span>
              <span className={accentColor}>Contractors</span>
              <span className="text-black"> for Your Needs</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Find skilled contractors for construction, renovation, and
              repair projects.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src="https://mccoymart.com/post/wp-content/webp-express/webp-images/uploads/Centring-Shuttering-Contractors.jpg.webp"
              alt="Contractor working on construction site"
              className="rounded-2xl shadow-xl object-cover w-full h-[340px] md:max-w-[420px]"
            />
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-3xl mx-auto mt-20 mb-20 p-6 bg-white rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">
          Contractor Registration Form
        </h2>

        <ContractorForm onSuccess={() => console.log("Form Submitted")} />
      </div>

      <Footer />
    </div>
  );
};

export default Contractors;
