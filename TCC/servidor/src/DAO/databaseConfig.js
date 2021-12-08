//Configuração de acesso ao usuario SA
const config = {
    user: 'sa',
    password: '',
    server: 'THIAGO\\SQL_TNSOFT', 
    database: 'FS_CAD',
    // port: 6969,
    trustServerCertificate: true
};

//Configuração de acesso de usuarios
const acessConfig = ({user = 'none', password = 'none'}) => {
    if(user !== 'none' && password  !== 'none') {
        return{
            user: user,
            password: password,
            server: 'THIAGO\\SQL_TNSOFT', 
            database: 'FS_CAD',
            // port: 6969,
            trustServerCertificate: true
        }
    }else{
        console.log('false')
        return false
    }
}



module.exports = {
    config,
    acessConfig
};