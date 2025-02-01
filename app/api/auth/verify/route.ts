"use server";

import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  try {
    if (!code) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }
    const foundVerificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!foundVerificationCode) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: foundVerificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: foundVerificationCode.id,
      },
    });
    return NextResponse.redirect(new URL("/?verified", req.url));
  } catch (error) {
    console.log("VERIFICATION ERROR", error);
  }
}
