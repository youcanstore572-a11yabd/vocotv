// components/SetupFAQItem.tsx
'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SetupFAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const headingId = useId();
  const answerId = useId();

  return (
    <div
      className={`w-full text-left bg-[#0B2347]/5 border-2 ${
        isOpen ? 'border-[#2AD1A1]' : 'border-[#0B2347]/15'
      } rounded-none hover:border-[#2AD1A1]/60 transition-all duration-300 group shadow-sm`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 sm:p-7 rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
          aria-expanded={isOpen}
          aria-controls={answerId}
          id={headingId}
        >
          <div className="flex justify-between items-center gap-4">
            <span
              className={`text-base sm:text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
                isOpen ? 'text-[#2AD1A1]' : 'text-[#0B2347] group-hover:text-[#2AD1A1]'
              } flex items-start sm:items-center gap-3 text-left`}
            >
              <span
                className={`${
                  isOpen ? 'text-[#2AD1A1]' : 'text-[#0B2347]/30'
                } font-black text-xl sm:text-2xl shrink-0`}
                aria-hidden="true"
              >
                Q.
              </span>
              <span>{question}</span>
            </span>
            <ChevronDown
              className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${
                isOpen
                  ? 'rotate-180 text-[#2AD1A1]'
                  : 'text-[#0B2347]/30 group-hover:text-[#2AD1A1]/60'
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
          <p className="text-[#0B2347]/80 font-semibold leading-relaxed text-sm sm:text-base pl-8 sm:pl-10 border-l-4 border-[#2AD1A1] ml-6 mr-6 pt-2 pb-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}