"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "react-use";

import { FormInput } from "../form/FormInput";
import { cn } from "@/shared/lib";

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
    () => {
      if (!isValueSet) {
        fetch(process.env.DADATA_URL as string, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token " + process.env.DADATA_TOKEN,
          },
          body: JSON.stringify({ query: value }),
        })
          .then((response) => response.json())
          .then((results) => setResults(results.suggestions))
          .catch((error) => console.log(error));
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
