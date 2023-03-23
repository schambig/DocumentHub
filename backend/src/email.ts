import nodemailer from "nodemailer";

// Configure nodemailer with your email provider's settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    
    user: "corecapitalsaf@gmail.com",
    pass: "xwrmggpqdgkyhibi",
  },
});

// Function to send an email with an auth token to restore password
export async function sendPasswordResetEmail(email: string, token: string) {
  const message = {
    from: "corecapitalsaf@gmail.com",
    to: email,
    subject: "Reset your password",
    html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click on the link below to reset your password:</p>
      <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
  };

  try {
    await transporter.sendMail(message);
    console.log("Password reset email sent to:", email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}
