// src/components/common/SelectField.tsx
import React from 'react';
import type { InputChangeEvent } from '../../types';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (e: InputChangeEvent) => void;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  className = 'mb-4',
  labelClassName = 'block text-sm font-medium text-gray-700',
  selectClassName = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2',
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={selectClassName}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;