import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "What is GoBuild?",
      answer: "GoBuild is a platform that connects skilled workers and professionals like Architects, Interior Designers and Material Providers with customers who need various construction services. We make it easy to find trusted workers for your projects."
    },
    {
      question: "How do I find the right professional for my project?",
      answer: "Simply browse our categories, view professional profiles, read reviews, and contact the ones that best match your needs. You can also post your project and let professionals come to you."
    },
    {
      question: "Are all professionals verified?",
      answer: "Yes, all professionals on our platform go through a verification process including identity verification, skill assessment, and background checks to ensure quality and safety."
    },
    {
      question: "How do payments work?",
      answer: "We offer secure payment processing. GoBuild charge 1% of fees as platform fees from the service providers. Payments are released to professionals upon project completion."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "We have a dispute resolution system in place. If you're not satisfied, you can raise a complaint and our team will work to resolve the issue. We also offer protection policies for certain types of work."
    },
    {
      question: "Can I become a professional on GoBuild?",
      answer: "Absolutely! If you're a skilled worker or contractor, you can apply to join our platform. You'll need to complete our verification process and provide proof of your skills and experience."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[600px]">
            {/* Left side - Title and subtitle */}
            <div className="lg:col-span-5">
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                  {t('faq.title')}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {t('faq.subtitle')}
                </p>
                <a href="/contact" className="text-primary hover:text-primary/80 font-semibold">
                  {t('faq.contactUs')}
                </a>
              </div>
            </div>

            {/* Right side - FAQ items */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  Still have questions? We're here to help!
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
