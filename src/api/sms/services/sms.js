const nodemailer = require('nodemailer');
const userEmail = process.env.MYEMAIL;
const userPass = process.env.MYPASS;

let sendSms = function() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const myNum = process.env.MYNUM;
    const twilioNum = process.env.TWILIONUM;
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: 'Hello Admin, someone just posted a comment',
            from: twilioNum,
            to: myNum,
        })
        .then((message) => console.log(message.sid));
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: userEmail,
        pass: userPass,
    },
});
let sendMail = function(from, to, subject, text) {
    const options = {
        from,
        to,
        subject,
        text,
    };
    // Return a promise of the function that sends the email.
    return transporter.sendMail(options);
};

module.exports = {
    sendSms,
    sendMail,
};