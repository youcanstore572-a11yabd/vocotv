// components/FAQItem.tsx
'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const headingId = useId();
  const answerId = useId();

  return (
    <div
      className={`w-full text-left bg-[#f9f9f9] border-2 ${
        isOpen ? 'border-[#EF233C]' : 'border-[#111111]/15'
      } rounded-none hover:border-[#EF233C]/60 transition-all duration-300 group shadow-sm`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div className="flex justify-between items-center gap-4">
            <span
              className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
                isOpen ? 'text-[#EF233C]' : 'text-[#111111] group-hover:text-[#EF233C]'
              } flex items-center gap-3`}
            >
              <span
                className={`${isOpen ? 'text-[#EF233C]' : 'text-[#111111]/30'} font-black text-2xl`}
                aria-hidden="true"
              >
                Q.
              </span>
              {question}
            </span>
            <ChevronDown
              className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                isOpen
                  ? 'rotate-180 text-[#EF233C]'
                  : 'text-[#111111]/30 group-hover:text-[#EF233C]/50'
              }`}
              aria-hidden="true"
            />
          </div>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={headingId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[#333333] font-medium leading-relaxed pl-10 md:pl-12 border-l-4 border-[#EF233C] ml-2 pt-2 pb-4 mr-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}