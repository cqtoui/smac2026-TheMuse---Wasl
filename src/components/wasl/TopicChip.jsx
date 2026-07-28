import React from 'react';

export default function TopicChip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        selected
          ? 'bg-wasl-primary text-white shadow-sm'
          : 'bg-[#EAF4FC] text-wasl-navy hover:bg-[#d6ecf8]'
      }`}
    >
      {label}
    </button>
  );
}