import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    console.log("SENDING EMAIL ", to);
    // -------------- TESTING -----------------
    to = "rontubarhoi01@gmail.com";

    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });
    console.log("EMAIL SENT ", data);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email : ", error);
    return { success: false, error };
  }
}
