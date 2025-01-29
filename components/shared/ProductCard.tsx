import Link from "next/link";
import { FC } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

import { Button, Title } from "../ui";
import { Routes } from "@/shared/constants/routes";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
}

export const ProductCard: FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  description,
}) => {
  return (
    <Link
      href={Routes.PRODUCT + `/${id}`}
      className="flex sm:flex-col gap-2 md:gap-0"
    >
      <div
        className="w-16 sm:w-full flex flex-shrink-0 justify-center items-center
        md:p-6 sm:bg-secondary rounded-lg"
      >
        <Image
          width={215}
          height={215}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          src={imageUrl}
          alt={name}
        />
      </div>
      <div>
        <Title text={name} size="sm" className="mb-1 md:mt-3 font-bold" />
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div
        className="flex flex-col items-center justify-between ml-auto 
        sm:flex-row md:mt-auto sm:ml-0"
      >
        <span>
          От <b>{price} ₽</b>
        </span>
        <Button variant="secondary">
          <Plus size={20} className="mr-1" />
          Добавить
        </Button>
      </div>
    </Link>
  );
};
