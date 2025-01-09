import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { i18n } from "@/config/i18n";

export async function POST(request: NextRequest) {
  try {
    const { lang, redirectPath = "/" } = await request.json();

    if (!i18n.locales.includes(lang)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    cookies().set("NEXT_LOCALE", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const segments = redirectPath.split("/");
    segments[1] = lang;
    const redirectUrl = segments.join("/");

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("Language conversion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
