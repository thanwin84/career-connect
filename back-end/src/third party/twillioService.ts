import Client from 'twilio';
import * as dotenv from 'dotenv';
dotenv.config();

const acount_sid = process.env.TWILIO_ACCOUNT_SID as string;
const auth_token = process.env.TWILIO_AUTH_TOKEN as string;

const client = Client(acount_sid, auth_token);

class TwillioService {
  serviceId: string;
  constructor() {
    this.serviceId = process.env.TWILIO_MESSAGING_SERVICE_ID as string;
  }

  async sendVerificationToken(phoneNumber: string, channel: string) {
    try {
      const verification = await client.verify.v2
        .services(this.serviceId)
        .verifications.create({ to: phoneNumber, channel: channel });
      return verification;
    } catch (error) {
      throw error;
    }
  }

  async verificationCheck(phoneNumber: string, code: string) {
    try {
      const verificationCheck = await client.verify.v2
        .services(this.serviceId)
        .verificationChecks.create({ to: phoneNumber, code });
      return verificationCheck.status;
    } catch (error) {
      throw error;
    }
  }
}
const twillioService = new TwillioService();
export default twillioService;
