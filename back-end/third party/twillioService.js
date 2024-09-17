import Client from 'twilio'
import * as dotenv from 'dotenv'
dotenv.config()


const acount_sid = process.env.TWILIO_ACCOUNT_SID
const auth_token = process.env.TWILIO_AUTH_TOKEN

const client = Client(acount_sid, auth_token)


class TwillioService{
    constructor(){
        this.serviceId = process.env.TWILIO_MESSAGING_SERVICE_ID
    }

    async  sendVerificationToken(phoneNumber, channel){
       
        try {
            const verification = await client.verify.v2.services(this.serviceId)
                        .verifications
                        .create({to: phoneNumber, channel: channel})
            return verification
            
        } catch (error) {
            
            throw error
        }

    }
    
    async  verificationCheck(phoneNumber, code){
        try {
            const verificationCheck = await client.verify.v2.services(this.serviceId)
              .verificationChecks
              .create({to: phoneNumber, code})
            return verificationCheck.status
        } catch (error) {
            throw error
        }
    }
}
const twillioService = new TwillioService()
export default twillioService