//Altera o apelido do device
const changeName = (id, nome) => {
  const query = `IF EXISTS (SELECT AIRNID_AIR FROM FS_CAD..FSAIRTAG WHERE AIRNID_AIR = ${id})
                    UPDATE FS_CAD..FSAIRTAG SET AIRCDESCRI = '${nome}' WHERE AIRNID_AIR = ${id}
                    ELSE
                    SELECT 'NÃO FOI POSSIVEL ATUALIZAR O NOME' AS ERRO`
  return query
}

//Deleta o device da conta do usuario "Desvincula"
  const deleteDevice = (id, nome) => {
    const query = ` DECLARE @AIRNID INT
                    DECLARE @USERNID INT
                    
                    SET @USERNID = (SELECT USUNID_ENT FROM FS_CAD..FSENTUSU WHERE USUCAPELID = '${nome}')
                    SET @AIRNID = (SELECT AIRNID_AIR FROM FS_CAD..FSAIRTAG where AIRNID_AIR = ${id})
                    
                    SELECT ATSNID_AIR FROM FS_CAD..FSAIRTAG_USU WHERE ATSNID_AIR = @AIRNID AND ATSNID_USU = @USERNID
                    
                    IF EXISTS (SELECT ATSNID_AIR FROM FS_CAD..FSAIRTAG_USU WHERE ATSNID_AIR = @AIRNID AND ATSNID_USU = @USERNID)
                        DELETE FS_CAD..FSAIRTAG_USU WHERE ATSNID_AIR = @AIRNID AND ATSNID_USU = @USERNID
                    ELSE
                        SELECT 'NÃO FOI POSSIVEL EXCLUIR O DISPOSITIVO' AS ERRO`
           
  
    return query
  }
  
  //Insere um novo device atraves do proprio dispositivo
  const newDeviceWithoutUsu = (body) =>{ 
  const query = `IF NOT EXISTS (SELECT AIRNID_AIR FROM FS_CAD..FSAIRTAG WHERE AIRCMACADR = '${body.mac}')
                      INSERT INTO FS_CAD..FSAIRTAG (AIRCDESCRI ,AIRCIP_ADR ,AIRCMACADR) values('${body.nome}', '${body.ip}', '${body.mac}')
                 ELSE
                      UPDATE FS_CAD..FSAIRTAG SET AIRCIP_ADR = '${body.ip}' WHERE AIRCMACADR = '${body.mac}'
                 `
  
  return query
  }

  

  module.exports = {
    changeName,
    deleteDevice,
    newDeviceWithoutUsu
}