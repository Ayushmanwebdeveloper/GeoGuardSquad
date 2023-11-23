export default async function handler(req, res) {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const clientMsg = require('twilio')(accountSid, authToken);
        console.log("cm" + clientMsg);
        clientMsg.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: 'Your incident has been submitted successfully',
                to: 'whatsapp:+916006157825'
            })
            .then(message => console.log(message.sid));
    }
    catch (e) {
        console.error(e);
    }
};