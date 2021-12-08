//Cria um novo usuario a partir da requisição do aplicativo
const createUser = (user, email, password) => {
  const query = `CREATE LOGIN ${user}
                        WITH PASSWORD    = N'${password}',
                        CHECK_POLICY     = OFF,
                        CHECK_EXPIRATION = OFF;
                  
                    EXEC sp_addsrvrolemember 
                        @loginame = N'${user}', 
                        @rolename = N'sysadmin';`
  
    return query
  }

  //insere as informações do usuario fornecidos por ele
  const insertUser = (user, email, password) => {
 
     const query = `IF NOT EXISTS (SELECT USUCAPELID FROM FS_CAD..FSENTUSU WHERE USUCAPELID = '${user}')
                        INSERT INTO FS_CAD..FSENTUSU
                                (USUCAPELID
                                ,USUC_EMAIL
                                ,USUCUSUSEN)
                        VALUES
                                ('${user}'
                                ,'${email}'
                                ,'${password}')`
     return query
   }
//Busca pelo email no banco de dados
   const myEmail = ( email ) => {
    const query = `SELECT USUCAPELID, USUC_EMAIL FROM FS_CAD..FSENTUSU where USUC_EMAIL = '${email}'`

    return query
}
//Atualiza o codigo de recuperação de conta
   const updatePassForget = ( email, cod ) => {
    const query = `IF EXISTS (SELECT USUC_EMAIL FROM FS_CAD..FSENTUSU where USUC_EMAIL = '${email}')
                        UPDATE FS_CAD..FSENTUSU SET USUCFORPAS = '${cod}' where USUC_EMAIL = '${email}'`

    return query
}
//Busca o codigo de verificação no banco
   const getCodeVerify = ( cod ) => {
    const query = `SELECT * FROM FS_CAD..FSENTUSU where USUCFORPAS = '${cod}'`
    return query
}
//Altera a senha do usuario
   const alterpassuser = ( user, password ) => {
    const query = `ALTER LOGIN ${user} WITH PASSWORD = '${password}';
                    update FS_CAD..FSENTUSU set USUCFORPAS = NULL where USUCAPELID = '${user}'`
    return query
}

  module.exports = {
      createUser,
      insertUser,
      myEmail,
      updatePassForget,
      getCodeVerify,
      alterpassuser
  }