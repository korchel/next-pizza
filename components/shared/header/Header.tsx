import { cn } from "@/shared/lib/utils";
import React, { FC } from "react";
import { Container } from "../Container";
import Image from "next/image";
import { Button } from "../../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "../SearchInput";
import { CartButton } from "./CartButton";

interface IHeaderProps {
  className?: string;
}

export const Header: FC<IHeaderProps> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={35} height={35} />
          <Link href="/">
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                Вкуснее уже некуда
              </p>
            </div>
          </Link>
        </div>
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-1" variant="outline">
            <User size={16} />
            Выйти
          </Button>
          <div>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
