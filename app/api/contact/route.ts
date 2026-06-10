import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, businessName, businessType, phone, email, package: pkg, message } = body;

    await resend.emails.send({
      from: "The Conversion Machine <onboarding@resend.dev>",
      to: "haykdallakyan07@gmail.com",
      replyTo: email,
      subject: `New Lead: ${firstName} — ${businessName}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8f9fa; border-radius: 12px;">
          <div style="background: #1B2A4A; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Lead from The Conversion Machine</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1B2A4A; font-weight: 600;">${firstName}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Business</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1B2A4A; font-weight: 600;">${businessName}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Business Type</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1B2A4A; font-weight: 600;">${businessType || "Not specified"}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1B2A4A; font-weight: 600;">${phone}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1B2A4A; font-weight: 600;">${email}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Package</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><span style="background: #E87722; color: white; padding: 3px 10px; border-radius: 20px; font-size: 13px; font-weight: 600;">${pkg || "Not specified"}</span></td></tr>
            <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #1B2A4A;">${message || "No additional message."}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #fff3e8; border-radius: 8px; border-left: 4px solid #E87722;">
            <p style="margin: 0; color: #1B2A4A; font-size: 13px;">Reply directly to this email to reach <strong>${firstName}</strong> at ${email}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
