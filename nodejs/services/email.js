const nodemailer= require('nodemailer')


const sendEmail= async options=>{
    // transporter
    const transporter=nodemailer.createTransport({
        service:"sendGrid",
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        },
        // pool: true, // use pooled connection
        // rateLimit: true, // enable to make sure we are limiting
        // maxConnections: 1, // set limit to 1 connection only
        // maxMessages: 3, // send 3 emails per second
    })
    // define the email provider
        const mailOptions={
            from:'ofwood-info <info@ofwood.co.il>',
            to:options.email,
            subject:options.subject,
            text:options.message,
            html:options.html
        }
    // send email
        await transporter.sendMail(mailOptions)
}

module.exports=sendEmail