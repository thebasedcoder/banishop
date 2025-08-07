import crypto from 'crypto';
import bcrypt from 'bcrypt';

const COOLDOWN_PERIOD_MINUTES = 2;

// Mock Email Service
// In a real app, replace this with a service like Resend, Nodemailer, or SendGrid.
export class Email {
  constructor(private user: { name?: string | null; email: string }) { }

  private async send(subject: string, text: string) {
    console.log("--- Sending Email ---");
    console.log(`To: ${this.user.email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${text}`);
    console.log("---------------------");
    // This is where your actual email sending logic would go.
    // For now, we'll just simulate a success.
    return Promise.resolve();
  }

  async sendCompleteRegistrationLink(token: string) {
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;
    const text = `Welcome! Please complete your registration by clicking here: ${verificationUrl}`;
    await this.send("Complete Your Registration", text);
  }

  async sendMagicLoginLink(token: string) {
    const loginUrl = `http://localhost:3000/magic-login?token=${token}`;
    const text = `Here is your magic login link: ${loginUrl}`;
    await this.send("Your Magic Login Link", text);
  }
}

// Check if the user is in a cooldown period
export function checkRequestCooldown(user: { lastVerifyRequestAt?: Date | null }): void {
  if (user.lastVerifyRequestAt) {
    const now = new Date();
    const lastRequest = new Date(user.lastVerifyRequestAt);
    const diffInMinutes = (now.getTime() - lastRequest.getTime()) / (1000 * 60);

    if (diffInMinutes < COOLDOWN_PERIOD_MINUTES) {
      throw new Error(`Please wait ${Math.ceil(COOLDOWN_PERIOD_MINUTES - diffInMinutes)} more minute(s) before requesting another link.`);
    }
  }
}

// Create a plaintext and a hashed token
export async function createToken(): Promise<{ plaintext: string, hashed: string }> {
  const plaintextToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(plaintextToken, 10);
  return { plaintext: plaintextToken, hashed: hashedToken };
}
