import { appConfig } from '../config/appConfig';
import nodemailer from 'nodemailer';
import { logger } from './logger';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: appConfig.MAILTRAP_AUTH_USER,
    pass: appConfig.MAILTRAP_PASSWORD,
  },
});
function VerifyEmailHtml({ name, url }: { name: string; url: string }) {
  return `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Hello, ${name}</h2>
            <p style="font-size: 16px; color: #555;">
                Please verify your email by clicking the button below:
            </p>
            <a href="${url}" 
                style="display: inline-block; padding: 10px 20px; margin-top: 15px; 
                font-size: 16px; color: #fff; background-color: #007bff; 
                text-decoration: none; border-radius: 5px;">
                Verify Email
            </a>
            <p style="margin-top: 20px; font-size: 14px; color: #777;">
                This link will expire in <strong>5 minutes</strong>.
            </p>
            <p style="margin-top: 10px; font-size: 14px; color: #777;">
                If you did not request this, please ignore this email.
            </p>
        </div>
    </div>
    `;
}

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail({
  emailType,
  to,
  userId,
}: {
  emailType: 'emailVerify' | 'forgotPassword';
  to: string;
  userId: string;
}) {
  const hashedToken = await bcrypt.hash(userId, 10);
  const expiryTime = Date.now() + 1000 * 60 * 5;
  const verificationUrl = `${appConfig.FRONT_END_BASE_URL}/${
    emailType === 'emailVerify' ? 'email-verify' : 'forgotPassword'
  }?token=${hashedToken}`;
  const toUpdate = {
    emailVerification: {
      emailVerifyToken: hashedToken,
      emailVerifyTokenExpiry: expiryTime,
    },
    passwordVerify: {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: expiryTime,
    },
  };
  const user = await User.findByIdAndUpdate(userId, {
    $set:
      emailType === 'emailVerify'
        ? { ...toUpdate.emailVerification }
        : { ...toUpdate.passwordVerify },
  });
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: 'thanwin@mail.com', // sender address
      to: to, // list of receivers
      subject:
        emailType === 'emailVerify'
          ? 'Verify your email'
          : 'Verify your password', // Subject line
      text: 'Hello world?', // plain text body
      html:
        emailType === 'emailVerify'
          ? VerifyEmailHtml({
              name: user?.firstName || '',
              url: verificationUrl,
            })
          : `<p>"hello world" </p>`, // html body
    });
    logger.info(`${emailType} email is sent to ${userId}`);
  } catch (error) {
    console.log(error);
    logger.error(error, 'Something went wrong while sending email');
  }
}
