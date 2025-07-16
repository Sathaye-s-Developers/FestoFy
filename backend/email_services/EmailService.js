const nodemailer = require("nodemailer");
require("dotenv").config();

// 🔐 Generate 6-digit OTP
function generateOTP(length = 6) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 10)).join("");
}

// 📬 Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// ✅ OTP Email for registration
async function sendOTP(toEmail, otp) {
  if (!toEmail || !otp) throw new Error("Missing email or OTP");

  const mailOptions = {
    from: `"Festofy OTP Service" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🔐 Your Festofy OTP Code - Secure Your Access",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #4a148c; text-align: center;">🎓 Festofy - OTP Verification</h2>
        <p style="font-size: 16px; color: #333;">Dear User,</p>
        <p style="font-size: 16px; color: #333;">
          Thank you for registering for a college event on <strong>Festofy</strong>!
        </p>
        <p style="font-size: 16px; color: #333;">
          Please use the OTP below to verify your email address and continue:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; color: #4a148c; background-color: rgb(0, 0, 0); padding: 10px 20px; border-radius: 8px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #555;">
          This OTP is valid for the next <strong>5 minutes</strong>. Do not share it with anyone.
        </p>
        <hr style="border: none; border-top: 1px solid #ccc;">
        <p style="font-size: 12px; color: #888; text-align: center;">
          If you didn’t request this, please ignore this email. <br>
          &copy; ${new Date().getFullYear()} Festofy Events. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

//  Registration Confirmation Email
async function sendConfirmationEmail(email, username) {
  const mail = {
    from: `"Festofy Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to Festofy – Registration Confirmed!",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 25px; background-color: #ffffff;">
        <h2 style="color: #4a148c; text-align: center;">🎓 Welcome to Festofy!</h2>
        <p style="font-size: 16px; color: #333;">Hi <strong>${username}</strong>,</p>
        <p style="font-size: 16px; color: #333;">
          Thank you for registering on <strong>Festofy</strong>, your official gateway to college events!
        </p>
        <p style="font-size: 16px; color: #333;">
          Your registration has been <strong>successfully confirmed</strong>.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <img src="https://img.icons8.com/color/96/000000/checked-2--v1.png" alt="Success" style="width: 80px;" />
          <p style="font-size: 18px; color: green; font-weight: bold;">You're All Set!</p>
        </div>
        <p style="font-size: 14px; color: #666;">
          You can now log in, browse events, and participate in activities. Stay tuned for updates!
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://festofy-frontend.onrender.com/" target="_blank" style="text-decoration: none; background-color: #4a148c; color: #fff; padding: 12px 25px; border-radius: 5px; font-size: 16px;">
            Go to Dashboard
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          If you did not register for Festofy, please ignore this email. <br>
          &copy; ${new Date().getFullYear()} Festofy Events. All rights reserved.
        </p>
      </div>
    `,
  };

  return await transporter.sendMail(mail);
}

//  Forgot Password OTP Email
async function sendForgotPasswordEmail(email, otp) {
  if (!email || !otp) throw new Error("Missing email or OTP");

  const mailOptions = {
    from: `"Festofy Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Festofy Password Reset Request",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 25px; background-color: #fdfdfd;">
        <h2 style="color: #4a148c; text-align: center;">🔐 Reset Your Password</h2>
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">
          We received a request to reset the password for your <strong>Festofy</strong> account.
        </p>
        <p style="font-size: 16px; color: #333;">
          Please use the OTP below to reset your password:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; color: #4a148c; background-color: #000000; padding: 10px 20px; border-radius: 8px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #555;">
          This OTP is valid for the next <strong>5 minutes</strong>. If you didn’t request a password reset, you can ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 30px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          &copy; ${new Date().getFullYear()} Festofy Events. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

//  Send Password Changed Success Notification
async function sendPasswordChangedConfirmation(email) {
  const mailOptions = {
    from: `"Festofy Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ Festofy Password Changed Successfully",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 25px; background-color: #ffffff;">
        <h2 style="color: #4a148c; text-align: center;">🔒 Password Changed Successfully</h2>
        <p>We're confirming that your password was recently changed for your <strong>Festofy</strong> account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <img src="https://img.icons8.com/color/96/password.png" alt="Password Changed" style="width: 80px;" />
        </div>
        <p>If you did not initiate this change, please reset your password immediately or contact our support.</p>
        <div style="text-align: center; margin: 20px;">
          <a href="https://festofy-frontend.onrender.com/" style="background-color: #4a148c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Festofy</a>
        </div>
        <hr>
        <p style="text-align: center; font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} Festofy Events</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// ✅ Export functions
module.exports = {
  generateOTP,
  sendOTP,
  sendConfirmationEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedConfirmation,
};