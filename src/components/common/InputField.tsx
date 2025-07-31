// src/components/common/InputField.tsx
import React from 'react';
import type { InputChangeEvent } from '../../types';

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: InputChangeEvent) => void;
  type?: 'text' | 'number' | 'date' | 'tel';
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  className = 'mb-4',
  labelClassName = 'block text-sm font-medium text-gray-700',
  inputClassName = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2',
  min,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
        min={min}
      />
    </div>
  );
};

export default InputField;