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
    <Link href={Routes.PRODUCT + `/${id}`} className="flex flex-col">
      <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <Image width={215} height={215} src={imageUrl} alt={name} />
      </div>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      <p className="text-sm text-gray-400">{description}</p>
      <div className="flex justify-between items-center mt-auto">
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
