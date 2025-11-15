import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw, ShieldAlert, FileWarning, CheckCircle } from "lucide-react";

const RefundPolicy: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen bg-white text-gray-800 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <RotateCcw size={50} className="mx-auto text-primary" />
            <h1 className="text-4xl font-bold mt-4">Refund & Cancellation Policy</h1>
            <p className="text-gray-600 mt-2 text-lg">Last updated: {new Date().getFullYear()}</p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
            At GoBuild, we aim to maintain a transparent and reliable experience for both customers
            and service providers. This policy explains the conditions under which bookings may
            be cancelled and refunds may be processed.
          </p>

          <div className="space-y-10">
            
            {/* Worker Cancellation Section */}
            <PolicySection
              number="1"
              title="Worker Cancellation Policy"
              icon={<ShieldAlert className="text-red-500" size={30} />}
              points={[
                "If a worker is unable to fulfill a confirmed booking, they must cancel at least 3 hours in advance through the GoBuild platform.",
                "Last-minute cancellations or failure to attend may negatively affect reliability score.",
                "Repeated no-shows or late cancellations may lead to temporary or permanent account suspension.",
                "GoBuild may apply penalty fees or restrict future job access for consistent cancellation or no-show behavior."
              ]}
            />

            {/* Customer Refund Terms */}
            <PolicySection
              number="2"
              title="Customer Refund Terms"
              icon={<RotateCcw className="text-blue-500" size={30} />}
              points={[
                "Refunds are applicable if the worker leaves the job incomplete or abandons the work.",
                "Customers may request refunds through the app or support team.",
                "Eligible and approved refunds will be processed within 5–7 business days using the original payment method."
              ]}
            />

            {/* Non-Refundable Cases */}
            <PolicySection
              number="3"
              title="Non-Refundable Situations"
              icon={<FileWarning className="text-yellow-500" size={30} />}
              points={[
                "If the customer cancels the service after the job has been fully completed.",
                "If dissatisfaction is based on personal preference and not on service scope, quality, or misconduct.",
                "If the customer fails to provide correct job details, access, or cooperation, resulting in incomplete work."
              ]}
            />

            {/* Dispute Handling */}
            <PolicySection
              number="4"
              title="Dispute Resolution"
              icon={<CheckCircle className="text-green-600" size={30} />}
              points={[
                "GoBuild may review evidence such as photos, timestamps, worker logs, and chat history.",
                "Both parties are required to cooperate during investigation.",
                "GoBuild will determine whether a full refund, partial refund, or no refund applies.",
                "The decision made by GoBuild will be final and binding."
              ]}
            />

            {/* Policy Updates */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-3">5. Policy Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                GoBuild reserves the right to revise or update this policy at any time. Updates will
                be posted on the app and website. Continued use of the platform constitutes acceptance
                of any revised version of this policy.
              </p>
            </div>

          </div>

          {/* Footer Note */}
          <footer className="text-center mt-16 opacity-60 text-gray-500">
            © {new Date().getFullYear()} GoBuild. All Rights Reserved.
          </footer>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

// Reusable Section Component
interface PolicySectionProps {
  number: string;
  title: string;
  points: string[];
  icon: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ number, title, points, icon }) => (
  <section>
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h2 className="text-2xl font-semibold">{number}. {title}</h2>
    </div>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      {points.map((p, i) => <li key={i}>{p}</li>)}
    </ul>
  </section>
);

export default RefundPolicy;
