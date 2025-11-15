import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Download, FileText } from "lucide-react";

const Policy: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadPDF = () => {
    window.print(); // User can download/save as PDF
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-gray-800 pt-32 pb-16 px-6 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">

          {/* Sidebar Table of Contents */}
          <aside className="hidden md:block sticky top-32 h-fit bg-gray-50 border rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-4">Contents</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {sections.map((s) => (
                <li
                  key={s.id}
                  className="cursor-pointer hover:text-primary"
                  onClick={() => scrollToSection(s.id)}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <div>
            {/* Header */}
            <div className="text-center mb-10">
              <ShieldCheck className="mx-auto text-primary" size={50} />
              <h1 className="text-4xl font-bold mt-4">GoBuild User Policy</h1>
              <p className="mt-2 text-gray-600 text-lg">
                Official Legal Policy Governing Platform Usage
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10">
              {sections.map((s) => (
                <Section key={s.id} id={s.id} number={s.number} title={s.title} content={s.content} />
              ))}
            </div>

            {/* Footer Legal Notice */}
            <footer className="text-center mt-16 opacity-60 text-gray-500">
              © {new Date().getFullYear()} GoBuild Solutions and Services Pvt. Ltd. All rights reserved.
            </footer>
          </div>
        </div>

        {/* Floating Download Button */}
        <button
          onClick={downloadPDF}
          className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-xl hover:scale-105 transition"
        >
          <Download size={22} />
        </button>
      </div>

      <Footer />
    </>
  );
};

/* =====================================
   SECTION COMPONENT
===================================== */
interface SectionProps {
  id: string;
  number: number;
  title: string;
  content: string;
}

const Section: React.FC<SectionProps> = ({ id, number, title, content }) => (
  <section id={id}>
    <h2 className="text-2xl font-semibold mb-3">
      {number}. {title}
    </h2>
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
  </section>
);

/* =====================================
   POLICY STRUCTURED CONTENT
===================================== */

const sections = [
  {
    id: "terms-of-use",
    number: 1,
    title: "Terms of Use",
    content:
      `By accessing or using GoBuild, you acknowledge that you have read, understood, and agree to be legally bound by this Policy. If you do not agree, you must discontinue use immediately.\nGoBuild reserves the right to update or modify this Policy at any time without prior notice. Continued use constitutes acceptance of any updated version.`,
  },
  {
    id: "definitions",
    number: 2,
    title: "Definitions",
    content:
      `“Account” refers to a user profile created to access GoBuild services.\n“Services” refers to all digital and operational solutions offered via the platform.\n“Privacy Policy” refers to the rules governing the use and protection of personal data.\n“User” refers to any individual or entity accessing or using the platform.`,
  },
  {
    id: "service-usage",
    number: 3,
    title: "Platform Usage",
    content:
      `Users are solely responsible for ensuring lawful use of the platform. Device, data, and network connectivity costs are the user's responsibility.\nGoBuild may restrict access, suspend accounts, or remove content that violates policy or legal obligations.`,
  },
  {
    id: "privacy",
    number: 4,
    title: "Privacy & Consent",
    content:
      `Use of GoBuild constitutes explicit consent to the collection, processing, storage, and secure transfer of user information as outlined in our Privacy Policy.`,
  },
  {
    id: "communication",
    number: 5,
    title: "Communication and Notifications",
    content:
      `Users agree to receive verification messages, alerts, service updates, and system notifications via SMS, email, app notifications, WhatsApp, or calls.`,
  },
  {
    id: "user-obligation",
    number: 6,
    title: "User Conduct Requirements",
    content:
      `Users must not engage in unauthorized access, data interception, platform misuse, harmful uploads, harassment, or activities that violate intellectual property, security, or law.`,
  },
  {
    id: "changes",
    number: 7,
    title: "Modification or Interruption of Service",
    content:
      `GoBuild does not guarantee uninterrupted access. Maintenance, upgrades, or unplanned disruptions may occur.`,
  },
  {
    id: "suspension",
    number: 8,
    title: "Suspension and Termination",
    content:
      `GoBuild may suspend or terminate accounts for violations, fraudulent activity, or security concerns.`,
  },
  {
    id: "liability",
    number: 9,
    title: "Limitation of Liability",
    content:
      `GoBuild is provided on an “as-is” basis. GoBuild shall not be held liable for revenue loss, data breach, downtime, or indirect damages.`,
  },
  {
    id: "jurisdiction",
    number: 10,
    title: "Governing Law",
    content:
      `This policy is governed by the laws of India. Legal disputes fall under the exclusive jurisdiction of Indian courts.`,
  },
];

export default Policy;
