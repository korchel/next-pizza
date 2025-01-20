"use client";

import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
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
      toastMessage = "Order has been paid! Info sent by e-mail";
    }
    if (searchParams.has("verified")) {
      toastMessage = "E-mail verified";
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
        {hasSearch && (
          <div className="mx-10 flex-1">
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
