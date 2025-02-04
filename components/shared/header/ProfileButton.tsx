import { CircleUser, User } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui";
import { Routes } from "@/shared/constants/routes";

interface Props {
  openModal: () => void;
  className?: string;
}

export const ProfileButton: FC<Props> = ({ openModal, className }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {session ? (
        <Link href={Routes.PROFILE}>
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            <span className="hidden sm:block">Профиль</span>
          </Button>
        </Link>
      ) : (
        <Button
          onClick={openModal}
          className="flex items-center gap-1"
          variant="outline"
        >
          <User size={16} />
          <span className="hidden sm:block">Войти</span>
        </Button>
      )}
    </div>
  );
};
