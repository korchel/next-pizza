import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/shared";
import { prisma } from "@/prisma/client";
import { getUserSession } from "@/shared/lib";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });
  console.log("SESSION", session);
  console.log("USER", user);

  if (!user) {
    return redirect("./not-auth");
  }

  return <ProfileForm user={user} />;
}
