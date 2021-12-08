//Script que vincula o device com o usuario esperando o MAC e o nome de usuario
//e faz o insert na tabela FS_CAD..FSAIRTAG_USU
const vincularDeviceUser = (mac, user) => {
    const query = ` DECLARE @AIRNID INT
                    DECLARE @USERNID INT
                    
                    SET @AIRNID = (SELECT AIRNID_AIR FROM FS_CAD..FSAIRTAG WHERE AIRCMACADR = '${mac}')
                    SET @USERNID = (SELECT USUNID_ENT FROM FS_CAD..FSENTUSU WHERE USUCAPELID = '${user}')
                    
                    INSERT INTO FS_CAD..FSAIRTAG_USU
                        (ATSNID_USU
                        ,ATSNID_AIR)
                    VALUES
                        (@USERNID
                        ,@AIRNID)`

                         
  
    return query
  }

  //Seleção de devices por usuario

  const myAirtags = ( user ) => {
      const query = `   DECLARE @AIRNID INT
                        DECLARE @USERNID INT
                        SET @USERNID = (SELECT USUNID_ENT FROM FS_CAD..FSENTUSU WHERE USUCAPELID = '${user}')
                        select * from FS_CAD..FSAIRTAG where AIRNID_AIR in (select ATSNID_AIR from FS_CAD..FSAIRTAG_USU where ATSNID_USU = @USERNID)`

      return query
  }
 


  module.exports = {
    vincularDeviceUser,
    myAirtags,
}