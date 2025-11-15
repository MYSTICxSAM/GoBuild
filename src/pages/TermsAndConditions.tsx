import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, AlertTriangle } from "lucide-react";

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-gray-800 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <ShieldCheck className="mx-auto text-primary" size={48} />
            <h1 className="text-4xl font-bold mt-4">GoBuild Terms & Conditions</h1>
            <p className="mt-2 text-gray-600 text-lg">
              For Workers & Service Providers
            </p>
          </div>

          {/* Notice Box */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-10 flex gap-3 items-start">
            <AlertTriangle className="text-yellow-600 flex-shrink-0" size={30} />
            <p className="text-gray-700 leading-relaxed">
              These Terms & Conditions apply to all workers using the GoBuild platform. 
              By accepting or performing a job, you acknowledge and agree to follow the rules listed below.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-10">
            <Section
              number="1"
              title="Registration & Eligibility"
              points={[
                "Workers must be at least 18 years old.",
                "Valid identity proof (Aadhaar / PAN) must be provided.",
                "Accurate skills and service categories must be mentioned.",
                "GoBuild reserves the right to verify, approve or reject registrations.",
                "Workers must keep their information updated at all times."
              ]}
            />

            <Section
              number="2"
              title="Job Allocation & Acceptance"
              points={[
                "Jobs are assigned based on skill, location, and availability.",
                "Once accepted, the worker must arrive on time, maintain hygiene, and carry necessary tools.",
                "Repeated cancellations or no-shows may result in suspension.",
                "Workers cannot contact customers directly outside the platform."
              ]}
            />

            <Section
              number="3"
              title="Payment Terms"
              points={[
                "Payments are processed securely via GoBuild (Razorpay/UPI).",
                "Cash transactions are not allowed unless explicitly permitted.",
                "Survey visits may include a ₹50–₹100 fee with partial payout if work is declined.",
                "Payments are released after customer approval with a 1% platform commission.",
                "Processing time: 24–48 hours post approval.",
                "Workers must provide correct bank/UPI details."
              ]}
            />

            <Section
              number="4"
              title="Commission & Deductions"
              points={[
                "Commission varies by service category.",
                "Taxes (GST, TDS) apply as per government rules.",
                "Refund adjustments may be applied based on dispute outcomes."
              ]}
            />

            <Section
              number="5"
              title="Dispute Resolution"
              points={[
                "Both parties must cooperate and provide proof if requested.",
                "Payments may remain on hold during investigation.",
                "If the worker is responsible for poor-quality work, payment may be partially or fully withheld.",
                "Repeated complaints may lead to account suspension."
              ]}
            />

            <Section
              number="6"
              title="Cancellations & No-Show Policy"
              points={[
                "Workers must cancel at least 3 hours before scheduled time.",
                "Repeated last-minute cancellations may result in penalties or account deactivation."
              ]}
            />

            <Section
              number="7"
              title="Data, Conduct & Confidentiality"
              points={[
                "Customer data must not be shared or misused.",
                "Professional behavior is mandatory at all times.",
                "Photos/videos can only be used for verification, not for personal or public posting."
              ]}
            />

            <Section
              number="8"
              title="Relationship with GoBuild"
              points={[
                "Workers are independent contractors, not employees.",
                "Workers are responsible for their tools, taxes, and service delivery."
              ]}
            />

            <Section
              number="9"
              title="Account Termination"
              points={[
                "GoBuild may suspend accounts for policy violations, fraud, or repeated complaints.",
                "Pending payments will be processed based on investigation outcomes."
              ]}
            />

            {/* Final Acceptance */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-3">10. Acceptance of Terms</h2>
              <p className="leading-relaxed text-gray-700">
                By using the GoBuild platform, you confirm that you have read and agree 
                to these Terms & Conditions. GoBuild may update the terms anytime, and 
                continued use of the platform indicates acceptance of updated policies.
              </p>
            </div>
          </div>

          <footer className="text-center mt-16 opacity-60 text-gray-500">
            <p>© {new Date().getFullYear()} GoBuild. All Rights Reserved.</p>
          </footer>
        </div>
      </div>

      <Footer />
    </>
  );
};


// Reusable Component
interface SectionProps {
  number: string;
  title: string;
  points: string[];
}

const Section: React.FC<SectionProps> = ({ number, title, points }) => (
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {number}. {title}
    </h2>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </section>
);

export default TermsAndConditions;
