export default async function handler(req, res) {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const clientMsg = require('twilio')(accountSid, authToken);
        console.log("cm" + clientMsg);
        let result=clientMsg.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: `A new incident has been reported. Please check the dashboard for more details.`,
                to: 'whatsapp:+916006188367'
            })
            .then(message => console.log(message.sid));
        res.status(204).send(result);
    }
    catch (e) {
        console.error(e);
    }
};