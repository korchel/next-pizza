"use server";

// import { Resend } from "resend";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// export const sendEmail = async (
//   to: string,
//   subject: string,
//   template: ReactNode
// ) => {
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   const { data, error } = await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to,
//     subject,
//     text: "",
//     react: template,
//   });

//   if (error) {
//     throw error;
//   }

//   return data;
// };

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV !== "development",
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD },
} as SMTPTransport.Options);

interface SendEmail {
  to: Mail.Address;
  from: Mail.Address;
  subject: string;
  html: string;
}

export const sendEmail = async (dto: SendEmail) => {
  const sentEmailData = await transport.sendMail(dto);
  return sentEmailData;
};
