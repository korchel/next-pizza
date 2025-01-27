"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "react-use";

import { FormInput } from "../form/FormInput";
import { cn, getAdresses } from "@/shared/lib";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const AddressInput: React.FC<Props> = ({ className }) => {
  const [results, setResults] = useState<Record<string, string>[]>([]);
  const [isValueSet, setValueSet] = useState(false);
  const { watch, setValue } = useFormContext();

  const name = "address";

  const value = watch(name);

  useDebounce(
    async () => {
      if (!isValueSet) {
        const adresses = await getAdresses(value);
        setResults(adresses);
      }
    },
    1000,
    [value]
  );

  return (
    <div className={cn(className, "relative")}>
      <FormInput
        name={name}
        className="text-base"
        placeholder="Адрес"
        required={true}
        onChange={(e) => {
          setValue(name, e.target.value);
          setValueSet(false);
        }}
      />
      {results.length > 0 && (
        <div className="shadow-md bg-white rounded-md px-3 py-2 text-sm z-10 absolute top-14 max-h-40 overflow-auto">
          {results.map((result, i) => (
            <div
              className="cursor-pointer py-1"
              onClick={() => {
                setValue(name, result.value);
                setResults([]);
                setValueSet(true);
              }}
              key={i}
            >
              {result.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
