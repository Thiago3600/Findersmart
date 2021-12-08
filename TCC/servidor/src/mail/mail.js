//Requerimentos necessarios
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {SmtpConfig, CLIENT_ID, CLIENT_SECRET} = require('./mailConfig');

//Tokens necessarios para envio de emails
const REDIRECT_URI = ''
const REFRESH_TOKEN = ''

//Seta as configurações de envio de email
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

//insere a credencial "Token"
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})



//Responsavel por envio de email
const sendMail = async (email, subject, body) => {

    const {user, cod} = body;

    try {
        const acessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SmtpConfig.user,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: acessToken,
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const mailOptions = {
            from: `FinderSmart <${SmtpConfig.user}>`,
            to: email,
            subject: subject,
            html: `<!DOCTYPE html>
            <html lang="pt-br">
            <body style=" ">
            <div style="align-items: center; 
                        border-width: 1; 
                        border-style: groove;
                        background-color: #00A2E8;
                        " id="mostrador">
                <!-- <p style="float: left; margin: 10px;">Vez do jogador:</p>
                <img src="" width="150px" alt="Figura?"> -->
                <h1 style="font-weight: 200; text-align: center; color: #fff;">FinderSmart</h1>
            </div>
            <div style="align-items: center; 
                        text-align: center;
                        font-weight: bold;
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: x-large;
                        ">
            
                <p >Ola ${user}</p>
                <p >Conforme o solicitado segue o codigo de recuperação de seu acesso ao nosso aplicativo</p>
                <p >Codigo:</p>
                <p style="color: #00A2E8; font-size: xx-large;" >${cod}</p>
            
            </div>
            
            </html>`
        }

        const result = await transport.sendMail(mailOptions)
        return result


    } catch (error) {
        return error
    }


}


module.exports = {
    sendMail
}

