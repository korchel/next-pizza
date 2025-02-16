"use client";

import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { Container } from "../../ui";
import { SearchInput } from "./SearchInput";
import { CartButton } from "./CartButton";
import { ProfileButton } from "./ProfileButton";
import { AuthModal } from "../modals";

interface IHeaderProps {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

export const Header: FC<IHeaderProps> = ({
  hasCart = true,
  hasSearch = true,
  className,
}) => {
  const searchParams = useSearchParams();
  const [isSigninModalOpen, setSigninModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage =
        "Заказ успешно оплачен! Информация о заказе от правлена по e-mail";
    }
    if (searchParams.has("verified")) {
      toastMessage = "E-mail подтвержден";
    }
    if (toastMessage) {
      router.replace("/");
      setTimeout(() => {
        toast.success(toastMessage, {
          icon: "✅",
        });
      });
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/" className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="h-[35px] w-[35px]" />
          <div className="hidden sm:block">
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              Вкуснее уже некуда
            </p>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-2 md:mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <ProfileButton openModal={() => setSigninModalOpen(true)} />
          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
      <AuthModal
        isOpen={isSigninModalOpen}
        close={() => setSigninModalOpen(false)}
      />
    </header>
  );
};
