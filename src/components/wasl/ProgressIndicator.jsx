import React from 'react';
import { Check } from 'lucide-react';

const steps = ['Situation', 'Perspectives', 'Understanding', 'Agreement'];

export default function ProgressIndicator({ currentStep = 1 }) {
  return (
    <div className="flex items-center justify-between w-full max-w-sm mx-auto px-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  isCompleted
                    ? 'bg-wasl-primary text-white'
                    : isActive
                    ? 'bg-wasl-primary text-white ring-4 ring-wasl-soft'
                    : 'bg-[#EAF4FC] text-wasl-gray'
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
              </div>
              <span className={`text-[10px] font-medium ${isActive || isCompleted ? 'text-wasl-navy' : 'text-wasl-gray'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 rounded-full mb-4 ${
                stepNum < currentStep ? 'bg-wasl-primary' : 'bg-[#EAF4FC]'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}