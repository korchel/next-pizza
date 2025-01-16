import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui";

interface Props {
  onClick: () => void;
  className?: string;
}

export const ProfileButton: FC<Props> = ({ onClick, className }) => {
  const { data: session } = useSession();
  return (
    <div className={className}>
      {session ? (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onClick}
          className="flex items-center gap-1"
          variant="outline"
        >
          <User size={16} />
          Enter
        </Button>
      )}
    </div>
  );
};
