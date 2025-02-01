import { prisma } from "@/prisma/client";
import { getUserSession } from "@/shared/lib";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    const userData = await prisma.user.findUnique({
      where: {
        id: Number(currentUser.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });
    return NextResponse.json(userData);
  } catch (error) {
    console.log("VERIFICATION ERROR", error);
  }
}
