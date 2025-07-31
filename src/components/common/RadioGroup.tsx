// src/components/common/RadioGroup.tsx
import React from 'react';
import type { InputChangeEvent } from '../../types';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  selectedValue: string;
  options: RadioOption[];
  onChange: (e: InputChangeEvent) => void;
  className?: string;
  labelClassName?: string;
  optionClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  selectedValue,
  options,
  onChange,
  className = 'mb-4',
  labelClassName = 'block text-sm font-medium text-gray-700 mb-2',
  optionClassName = 'flex items-center',
}) => {
  return (
    <div className={className}>
      <label className={labelClassName}>{label}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <div key={option.value} className={optionClassName}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900 cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;