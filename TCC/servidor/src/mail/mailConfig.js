//Informações para acesso do email e host
const user = 'findersmartcc@gmail.com'
const password = '123456789'
const host = 'smtp.gmail.com'

const SmtpConfig = {
    host: host,
    port: 587,
    secure: true,
    user: user,
    pass: password,
    
}

module.exports = {
    CLIENT_ID: 'Seu codigo do CLIENT_ID',
    CLIENT_SECRET: 'Seu Codigo CLIENT_SECRET',
    SmtpConfig,
};
