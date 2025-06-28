const nodemailer = require("nodemailer");
require("dotenv").config();


//create otp
function generateOTP(length = 6) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 10)).join('');
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // your app password
  },
});



//otp sending function
async function sendOTP(toEmail) {
  const otp = generateOTP();
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
        <span style="font-size: 28px; font-weight: bold; color: #4a148c; background-color:rgb(0, 0, 0); padding: 10px 20px; border-radius: 8px; display: inline-block;">
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
  return otp; // you store this temporarily with expiry
}



//registration  confirm
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
          Thank you for registering on <strong>Festofy</strong>  your official gateway to college events!
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
          <a href="//    " target="_blank" style="text-decoration: none; background-color: #4a148c; color: #fff; padding: 12px 25px; border-radius: 5px; font-size: 16px;">
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






module.exports = {sendOTP,sendConfirmationEmail};