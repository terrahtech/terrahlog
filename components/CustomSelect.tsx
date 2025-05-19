'use client';

import { useState } from 'react';
import {  FiChevronDown } from 'react-icons/fi';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, defaultValue, onChange, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>(
    options.find((opt) => opt.value === defaultValue)
  );

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mt-1">
      <button
        type="button"
        className="w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)] rounded-md text-left flex  items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : <span className="text-gray-400">{placeholder}</span>}
        <FiChevronDown />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer   ${
                selected?.value === option.value ? 'bg-gray-100 text-white dark:bg-[var(--hover)]' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
