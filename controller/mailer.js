
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'sangenyx@gmail.com',
        pass: ''
    }
});

let mailOptions = {
    to: '',
    from: 'sangenyx@gmail.com',
    subject: 'Doctorpedia News Subscription',
    text: 'Hello',
    html: '<b>Welcome to Doctorpedia News!</b>'
};

transporter.sendMail(mailOptions.to, mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
