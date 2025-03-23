import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/User";
import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    try {
      const result = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "info.skillify.inc@gmail.com",
        subject: "Your OTP Code",
        react: EmailTemplate({ otp }) as any,
      });

      if (!result || result.error) {
        throw new Error(result?.error?.message || "Failed to send email");
      }

      user.otp = otp;
      await user.save();

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (emailError) {
      console.error("Email service error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
