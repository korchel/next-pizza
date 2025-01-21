import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/shared";
import { prisma } from "@/prisma/client";
import { getUserSession } from "@/shared/lib";
import { Routes } from "@/shared/constants/routes";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect(Routes.NOT_AUTH);
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });

  if (!user) {
    return redirect(Routes.NOT_AUTH);
  }

  return <ProfileForm user={user} />;
}
