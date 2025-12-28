import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is LocalConnect and how does it work?",
    answer:
      "LocalConnect connects users with nearby service providers such as electricians, plumbers, tutors, and event professionals. Users raise service requests, and providers can view, accept, and complete jobs based on their skills and location.",
  },
  {
    id: 2,
    question: "How do I raise a service request?",
    answer:
      "Go to the 'Raise Request' section from the sidebar, select the service type, describe your requirement, choose your location, and submit. Your request will be visible to nearby service providers.",
  },
  {
    id: 3,
    question: "How can service providers accept requests?",
    answer:
      "Service providers can open the 'Accept Requests' page to view all pending requests matching their skills and location. Click 'Accept' to assign the job to yourself.",
  },
  {
    id: 4,
    question: "What happens after I accept a request?",
    answer:
      "Once accepted, the request moves to the 'Assigned Requests' page. You can view job details, contact the client, and complete the service.",
  },
  {
    id: 5,
    question: "How do I mark a job as completed?",
    answer:
      "After finishing the service, open the assigned request and mark it as 'Completed'. Completed jobs will appear in your service history.",
  },
  {
    id: 6,
    question: "How can I update my profile and skills?",
    answer:
      "Go to the 'My Profile' section to update your personal information, contact details, location, and skills. Keeping your profile updated helps you get relevant job requests.",
  },
  {
    id: 7,
    question: "Can I see my past service history?",
    answer:
      "Yes. Completed jobs are available in the 'Completed Requests' or 'History' section, where you can track your previous work.",
  },
  {
    id: 8,
    question: "Is LocalConnect free to use?",
    answer:
      "LocalConnect is currently a demo platform designed to showcase local service connections. No real payments are involved at this stage.",
  },
];

const Help = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
        Help & Frequently Asked Questions
      </h1>

      {faqs.map((faq) => (
        <div
          key={faq.id}
          onClick={() => toggleFAQ(faq.id)}
          className="bg-gray-800 p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-200"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{faq.question}</h2>
            <span className="text-2xl font-bold text-indigo-400">
              {expandedId === faq.id ? "−" : "+"}
            </span>
          </div>

          {expandedId === faq.id && (
            <p className="text-gray-300 mt-4 leading-relaxed">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Help;
