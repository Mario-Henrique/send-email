const nodemailer = require('nodemailer')

export default function sendEmail(req, res){
    let transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 465, //587 sem SSL e 465 com SSL
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL
        }
    })

    let {user, to, from, subject, msg} = req.body

    transporter.sendMail({
        from: `"${user}" <${process.env.USERMAIL}>`,
        to: to,
        replyTo: from,
        subject: subject,
        text: msg,
        html: msg
    }).then(
        (result) => {
            res.send({"msg": "E-mail send success"})
        }
    ).catch(
        (error) => {
            res.send({"msg": `E-mail send fail. \nError: ${error}`})
        }
    )
}