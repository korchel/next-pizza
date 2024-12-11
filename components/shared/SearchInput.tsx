"use client";

import { cn } from "@/lib/utils";
import { api } from "@/services/apiClient";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { ChangeEventHandler, FC, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([])

  useClickAway(ref, () => {
    setFocused(false);
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const handleOnClick = () => {
    setFocused(false);
    setQuery('');
    setProducts([]);
  };

  useDebounce(() => {
    api.products
      .search(query)
      .then((items) => {
      setProducts(items);
      })
      .catch((error) => console.error(error));
  }, 200, [query]);

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
          value={query}
          onChange={handleOnChange}
        />
        {products.length > 0 && <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {
            products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                className="flex items-center gap-3 px-3 py-3 hover:bg-primary/10"
                key={product.id}
                onClick={handleOnClick}
              >
                <img
                  src={product.imageUrl}
                  className="h-8 w-8 rounded"
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))
          }
          
        </div>}
      </div>
    </>
  );
};
