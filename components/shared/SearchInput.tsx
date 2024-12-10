"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });
  return (
    <>
      {focused && <div className="fixed inset-0 bg-black/50 z-30" />}
      <div
        className={cn(
          className,
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30"
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
        />
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          <Link
            href="/product/1"
            className="flex items-center gap-3 px-3 py-3 hover:bg-primary/10"
          >
            <img
              src="https://media.dodostatic.net/image/r:292x292/11EF9C1DAAFCF3529A62947B9522A8FE.avif"
              className="h-8 w-8 rounded"
              alt="pizza 1"
            />
            <span>Product</span>
          </Link>
        </div>
      </div>
    </>
  );
};
