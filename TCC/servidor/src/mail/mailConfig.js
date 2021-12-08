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
    CLIENT_ID: '396095430244-qtf721u6763f7m50fvb28cmcmh1r9uod.apps.googleusercontent.com',
    CLIENT_SECRET: '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',
    SmtpConfig,
};