//Requerimentos necessarios
const {createUser, insertUser, myEmail, updatePassForget, getCodeVerify, alterpassuser} = require('./DAO/scriptsDataUser')
const {vincularDeviceUser, myAirtags} = require('./DAO/scriptDeviceUser')
const {changeName, deleteDevice, newDeviceWithoutUsu} = require('./DAO/scriptsDataDevice')
const {config, acessConfig} = require('./DAO/databaseConfig')
const {sendMail} = require('./mail/mail')
const bodyParser = require('body-parser')
const express = require('express');
const sql = require("mssql");
const http = require('http');

const app = express();
const port = 9090

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Cria o server
const server = http.createServer(app)

//Ao iniciar testa a conexão com o banco
sql.connect(config, function (err) {
  if (err) console.log(err); 
})

//Codigo de erro tratados
const erro = (err) => {
  const number = err.number
  switch (number) {
    case 15025:
      return {error: number , message: 'Usuario já cadastrado'}
    default:
      return {error: err.number , message: err.message}
  }
}

//Altera no nome do device
app.post('/newname', function (req, res) {
  const name = req.body
  try {
    const pool = new sql.ConnectionPool(acessConfig(name))
    pool.connect(err => {
      if(err) {
        console.log(err.code)
        res.send({
          result: err.code
        })
      }else{
        pool.query(changeName(name.id, name.name), function (err, recordset){
          if (err) {
            console.log(err)
            res.send({
              result: err.code
            })
          }else{
            res.send({
              result: 'sucess'
            })
          }
        })
      }
    })
    }catch (error) {
      console.log(error)
    }
});

//Cria um novo usuario
app.post('/newuser', function (req, res) {

  const name = req.body
  const create = new sql.Request(); 
  create.query(createUser(name.user, name.email,name.password), function (err, recordset) {
      if (err) {
        console.log(erro(err))
        res.send(erro(err))
      }else{
        const insert = new sql.Request(); 
        insert.query(insertUser(name.user, name.email,name.password), function (err, recordset) {
            if (err) {
              console.log(erro(err))
              res.send(erro(err))
            }else{
              res.send({
                result: 'sucess'
              });       
            }
          });     
      }
    });
});



//Autentica usuarios para qualquer processo que seja necessario
app.post('/authuser', async function (req, res) {
  const name = req.body
  try {
    const pool = new sql.ConnectionPool(acessConfig(name))
    pool.connect(err => {
      if(err) {
        console.log(err)
        res.send({
          result: err
        })
      }else{
        res.send({
          result: 'pass'
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

//Recebe informação do dispositivo e usuario e vincula eles
app.post('/vincdevice', async function (req, res) {
  const name = req.body
try {
  const pool = new sql.ConnectionPool(acessConfig(name))
  pool.connect(err => {
    if(err) {
      console.log(err.code)
      res.send({
        result: err.code
      })
    }else{
      pool.query(vincularDeviceUser(name.mac, name.user), function (err, recordset){
        if (err) {
          console.log(err)
          res.send({
            result: err.code
          })
        }else{
          res.send({
            result: 'sucess'
          })
        }
      })
    }
  })
  }catch (error) {
    console.log(error)
  }
})



//Lista devices a partir do usuario fornecido
app.post('/myairtags', async function (req, res) {
  const name = req.body
  try {
    const pool = new sql.ConnectionPool(acessConfig(name))
    pool.connect(err => {
      if(err) {
        console.log(err.code)
        res.send({
          result: err.code
        })
      }else{
        pool.query(myAirtags(name.user), function (err, recordset){
          if (err) {
            console.log(err)
            res.send({
              result: err.code
            })
          }else{
            console.log(recordset)
            res.send(recordset.recordsets[0]);
          }
        })
      }
    })
    }catch (error) {
      console.log(error)
    }
})

//Desvincula o dispositivo com o usuario, porem o device permanece
app.post('/deleteDevice', function (req, res) {

  const name = req.body
  try {
    const pool = new sql.ConnectionPool(acessConfig(name))
  
    pool.connect(err => {
      if(err) {
        console.log(err.code)
        res.send({
          result: err.code
        })
      }else{
        pool.query(deleteDevice(name.id, name.user), function (err, recordset){
          if (err) {
            console.log(err)
            res.send({
              result: err.code
            })
          }else{
            res.send({
              result: 'sucess'
            })
          }
        })
      }
    })
    }catch (error) {
      console.log(error)
    }
});

//Responsavel por inserir condigo de verifição e enviar o email ao usuario para recuperar sua conta
app.post('/forgetpass', function  (req, res)  {
  const body = req.body
  if(body.hasOwnProperty('email')){
    const cod = (Math.random() * 10000).toFixed(0)
    const request = new sql.Request(); 
    request.query(myEmail(body.email), function (err, recordset) {
      if (err) {
        console.log(err)
        res.send({
          result: 'Email not found'
        })
      }
      console.log(recordset)
      if(recordset.recordset.length > 0){
      
      if(recordset.recordset[0].hasOwnProperty('USUC_EMAIL')){
        const dados = {
          ...recordset.recordset[0]
        }
        const passForget = new sql.Request(); 
        passForget.query(updatePassForget(dados.USUC_EMAIL, cod), async function (err, recordset) {
          if (err) console.log(err)
          let emailStatus = await sendMail(dados.USUC_EMAIL, 
                                          "Recuperação de senha", 
                                          {cod: cod, user: dados.USUCAPELID})
                            .then(result => {
                              console.log(result)
                              return 'pass'
                            }).catch(err =>{
                              console.log(err.message)
                              return 'failed'
                            })
                            
            res.send({
              result: emailStatus
            });
          });
          }
            
      }else{
        res.send({
          result: 'Email not found'
        })
      }
    });
  }else{
    console.log("Pacote invalido")
  }
})

//  Verifica se o usuario inseriu um codigo de 
//verificação vinculado ao seu usuario e autoriza 
//ou não a alterar a senha de conta
app.post('/verify', function  (req, res)  {
  const body = req.body
  if(body.hasOwnProperty('verify')){
    const checkcode = new sql.Request();
    checkcode.query(getCodeVerify(body['verify']), function (err, recordset){
      if(err){
        console.log(err.message)
      }
      if(recordset.recordset.length == 1){
        res.send({
          result: 'granted',
          user: recordset.recordset[0].USUCAPELID
        })
      }else{
        res.send({
          result: 'Failed'
        })
      }
    })
  }
})

//Altera a senha da conta do usuario
app.post('/alterpassuser', function  (req, res)  {
  const body = req.body
  if(body.hasOwnProperty('user') && body.hasOwnProperty('password')){
    const altpass = new sql.Request();
    altpass.query(alterpassuser(body['user'], body['password']), function (err, recordset){
      if(err){
        console.log(err.message)
      }
      res.send({
            result: 'granted',
          })
    })
  }
})

//insere um novo dispositivo ao banco a partir do post vindo diretamente do dispositivo
app.post('/newdevice', function (req, res) {
  const body = req.body
  const request = new sql.Request(); 
  request.query(newDeviceWithoutUsu(body), function (err, recordset) {
      if (err) console.log(err)
      console.log(recordset)
      res.send(recordset);
  });
})


//Configura servidor a escutar uma porta pré-configurada
server.listen(port, function () {
    console.log(`Servidor rodando na porta ${port}`);
})
    
