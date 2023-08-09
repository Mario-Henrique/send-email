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

    transporter.sendMail({
        from: `"${req.body.user}" <${process.env.USERMAIL}>`,
        to: process.env.USERMAIL,
        replyTo: req.body.from,
        subject: req.body.subject,
        text: req.body.msg,
        html: req.body.msg
    }).then(
        (res) => {
            res.send(res)
        }
    ).catch(
        (error) => {
            res.send(error)
        }
    )
}