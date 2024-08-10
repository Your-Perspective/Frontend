"use client";
import React, { useState, useEffect } from "react";

// Define the interface for the options prop
interface OptionType {
  label: string;
  value: string | number;
}

interface MultiSelectProps {
  options: OptionType[];
  selectedValues: string[]; // Add selectedValues as a prop
  onChange: (name: string, selectedValues: string[]) => void; // Add a callback for when selection changes
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedValues, setInternalSelectedValues] =
    useState<string[]>(selectedValues);

  // Sync internal state with prop
  useEffect(() => {
    setInternalSelectedValues(selectedValues);
  }, [selectedValues]);

  const handleSelect = (value: string) => {
    setInternalSelectedValues((prev) => {
      const newSelectedValues = [...prev];
      const valueIndex = newSelectedValues.indexOf(value);

      if (valueIndex >= 0) {
        newSelectedValues.splice(valueIndex, 1);
      } else {
        newSelectedValues.push(value);
      }

      onChange("multi-select", newSelectedValues); // Pass the field name as 'multi-select'
      return newSelectedValues;
    });
  };

  const handleRemove = (value: string) => {
    setInternalSelectedValues((prev) => {
      const newSelectedValues = prev.filter((v) => v !== value);
      onChange("multi-select", newSelectedValues); // Pass the field name as 'multi-select'
      return newSelectedValues;
    });
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full border rounded-lg p-3 flex items-center flex-wrap gap-2 border-gray-300 dark:border-gray-700 cursor-pointer shadow-sm dark:shadow-md transition-all duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {internalSelectedValues.length > 0 ? (
          internalSelectedValues.map((value) => (
            <div
              key={value}
              className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 flex items-center gap-2"
            >
              <span className="text-gray-800 dark:text-gray-100 truncate">
                {value}
              </span>
              <button
                type="button"
                className="text-sm font-semibold text-red-600 dark:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(value);
                }}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-800 dark:text-gray-100">
            Select options
          </span>
        )}
        <span className="ml-auto text-gray-500 dark:text-gray-400">▼</span>
      </div>
      {isOpen && (
        <div
          className="absolute mt-2 w-full border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 shadow-lg dark:shadow-xl z-10 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out"
          onMouseLeave={() => setIsOpen(false)} // Close dropdown when mouse leaves
        >
          <div className="p-3">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={internalSelectedValues.includes(
                    String(option.value)
                  )}
                  onChange={() => handleSelect(String(option.value))}
                  className="mr-2"
                />
                <label
                  className="text-gray-800 dark:text-gray-100 cursor-pointer"
                  onClick={() => handleSelect(String(option.value))}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
