import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // In production, an email delivery service (like Resend, SendGrid, or nodemailer)
    // can be configured via environment variables.
    console.log(`[Contact Form Received] From: ${name} <${email}>`);
    console.log(`Subject: ${subject || "No Subject"}`);
    console.log(`Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
    });
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      { error: "Failed to process contact message." },
      { status: 500 }
    );
  }
}
