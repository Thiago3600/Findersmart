//Requerimentos necessários
import {getData} from '../data/storage'
const servidor = 'http://tnsoft.ddns.net'
const porta = '39999'
const gatewayESP = '192.168.4.1'

//Solicita ao servidor para mudar a senha de usuario
async function alterPassUser(user, password) {
    // POST request using fetch with async/await

    //const user = await getData('auth')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: `${user}`, password: `${password}`})
    };

    const URL = `${servidor}:${porta}/alterpassuser`

    try {
    const result = await fetch(URL, requestOptions)
                            .then((response) => {
                                if (response.status == 200){
                                    return response.text()
                                }else{
                                    throw new Error("Erro interno")
                                }
                            }).catch((err) => {
                                console.error(err)
                            });
    return JSON.parse(result)                             
    } catch (error) {
        console.log(error.message)
    }

}
//Pergunta ao servidor se o codigo de verificação é valido
async function verifyCode(cod) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({verify: `${cod}`})
    };

    const URL = `${servidor}:${porta}/verify`

    try {
    const result = await fetch(URL, requestOptions)
                            .then((response) => {
                                if (response.status == 200){
                                    return response.text()
                                }else{
                                    throw new Error("Erro interno")
                                }
                            }).catch((err) => {
                                console.error(err)
                            });
    return JSON.parse(result)                             
    } catch (error) {
        console.log(error.message)
    }
}
//Solicita o envio de email com o codigo de recuperação de conta
async function forgetPassword(email) {
    // POST request using fetch with async/await

    const user = await getData('auth')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: `${email}`})
    };

    const URL = `${servidor}:${porta}/forgetpass`

    try {
    const result = await fetch(URL, requestOptions)
                            .then((response) => {
                                if (response.status == 200){
                                    return response.text()
                                }else{
                                    throw new Error("Erro interno")
                                }
                            }).catch((err) => {
                                console.error(err)
                            });
    return JSON.parse(result)                             
    } catch (error) {
        console.log(error.message)
    }
    // const response = await fetch('https://192.168.50.67/newname/', requestOptions);
    // const data = await response.json();
    // this.setState({ postId: data.id });
}

//Solicita a listagem de devices pelo usuario
const getAirTags = async () => {

    const user = await getData('auth')

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: `${user.user}`,  password: `${user.password}`})
    };

    const URL = `${servidor}:${porta}/myairtags`
   
    try {
        const result = await fetch(URL, requestOptions).then((response) =>{
           if(response.status === 200) {
                return response.text()
           }else{
                //return undefined
                throw new Error("Something is wrong")
            }
       }).then((responseText) => {
        //console.log(responseText)
        return responseText;
      }).catch((error) =>{
          console.error(error.message)
      })

      //console.log(JSON.parse(result))

      return JSON.parse(result)
      } catch (error) {
          console.error(error.message)
      }
}
//Solicita autenticação de usuario
async function authUser(user, password) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: `${user}`,  password: `${password}` })
    };

    const URL = `${servidor}:${porta}/authuser`

    try {
    const result = await fetch(URL, requestOptions)
        .then((response) => {
            // console.log(response)
            console.log(response.status)
            if (response.status == 200){
                //console.log('ok', response)
                return response.text()
            }else{
                throw new Error("Erro interno")
            }
        }).then((responseText) => {
            //console.log(responseText)
            return JSON.parse(responseText)
          }).catch((error) =>{
              console.error(error.message)
          });; 
          return result
    } catch (error) {
        console.log(error.message)
    }
}

//Solicita a criação de usuario
async function createUser(user, email, password) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user: `${user}`, email: `${email}` ,password: `${password}` })
    };

    const URL = `${servidor}:${porta}/newuser`

    try {
    const result = await fetch(URL, requestOptions)
        .then((response) => {
            // console.log(response)
            console.log(response.status)
            if (response.status == 200){
                // console.log('ok', response)
                return response.text()
            }else{
                throw new Error("Erro interno")
            }
        }).then((responseText) => {
            //console.log(responseText)
            return JSON.parse(responseText)
          }).catch((error) =>{
              console.error(error.message)
          });
          return result
    } catch (error) {
        console.log(error.message)
    }
    // const response = await fetch('https://192.168.50.67/newname/', requestOptions);
    // const data = await response.json();
    // this.setState({ postId: data.id });
}

//Solicita a mudança de nome dee dispositivo
async function changeNameDevice(id, name) {
    // POST request using fetch with async/await

    const user = await getData('auth')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id,  name: `${name}`, user: `${user.user}`, password: `${user.password}`})
    };

    const URL = `${servidor}:${porta}/newname`

    try {
    const result = await fetch(URL, requestOptions)
                            .then((response) => {
                                if (response.status == 200){
                                    return response.text()
                                }else{
                                    throw new Error("Erro interno")
                                }
                            }).catch((err) => {
                                console.error(err)
                            });
    return JSON.parse(result)                             
    } catch (error) {
        console.log(error.message)
    }
    // const response = await fetch('https://192.168.50.67/newname/', requestOptions);
    // const data = await response.json();
    // this.setState({ postId: data.id });
}
//Solicita a vinculação de dispositivo com o usuario
async function vincMacDevice(mac, user) {
    // POST request using fetch with async/await
    console.log(mac, user)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({mac: `${mac}`, user: `${user.user}`,  password: `${user.password}`})
    };

    const URL = `${servidor}:${porta}/vincdevice`
    try {
    const result = await fetch(URL, requestOptions)
        .then((response) => {
            if (response.status == 200){
                console.log('ok')
                return response.text();
            }else{
                throw new Error("Erro interno")
            }
        }).then((responseText) => {
            
            return responseText
          }).catch((error) =>{
              console.error(error.message)
          }); 
        //console.log(JSON.parse(result))
        return JSON.parse(result)
    } catch (error) {
        console.log(error.message)
    }
    // const response = await fetch('https://192.168.50.67/newname/', requestOptions);
    // const data = await response.json();
    // this.setState({ postId: data.id });
}
//Solicita a exclusão de dispositivo da conta do usuario
async function deleteDevice(id) {
    // POST request using fetch with async/await
    const user = await getData('auth')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: id, user: `${user.user}`,  password: `${user.password}`})
    };
    const URL = `${servidor}:${porta}/deleteDevice`
    try {
        const result = await fetch(URL, requestOptions)
                                .then((response) => {
                                    if (response.status == 200){
                                        console.log('ok')
                                        return response.text()
                                    }else{
                                        throw new Error("Erro interno")
                                    }
                                }).catch((error) => {
                                    console.log('error')
                                }); 
        return JSON.parse(result)
    } catch (error) {
        console.log(error.message)
    }
    // const response = await fetch('https://192.168.50.67/newname/', requestOptions);
    // const data = await response.json();
    // this.setState({ postId: data.id });
}
//Requisição com time out para não prolongar por muito tempo de requisição
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  }

//Solicita ao dispositivo o status do pino do buzzer
const getStatusPin = async (urlDevice) => {
    const URLPin = `http://${urlDevice}:8090/status`.replace(/\s+/g, '');
    try {
        const resultPin = await fetch(URLPin).then((response) =>{
           if(response.status === 200) {
                return response.text()
           }else{
                //return undefined
                throw new Error("Something is wrong")
            }
       }).then((responseText) => {
        //console.log(JSON.parse(responseText).digital[0])
        return responseText
      }).catch((error) =>{
          console.log(error.message)
      })
    //   console.log(JSON.parse(resultPin))
    if(resultPin !== undefined){
            return JSON.parse(resultPin)
        }else{
            return false
        }

      
    } catch (error) {
            console.error(error.message)
    }    
}
//Conecta ao device e alterna o status do buzzer
const connectDevice = async (urlDevice) => {
    const URL = `http://${urlDevice}:8090/L${await getStatusPin(urlDevice).then(n => n.digital[0]==1?0:1 )}`
                .replace(/\s+/g, '');

    // console.log(URL)
    try {
            const result = await fetchWithTimeout(URL, {timeout: 800}).then((response) =>{
               if(response.status === 200) {
                    return getStatusPin(urlDevice).then(n =>  n.digital[0])
               }else{
                    //return undefined
                    throw new Error("Something is wrong")
                }
           }).catch((error) =>{
              console.log("Erro: ", error.message)
              return false
          })
          
          return result
          } catch (error) {
              console.error(error.message)
          }    
}
//Desativa o buzzer
const desativarDevice = async (urlDevice) => {
    const URL = `http://${urlDevice}:8090/L0`
                .replace(/\s+/g, '');

    // console.log(URL)
    try {
            const result = await fetchWithTimeout(URL, {timeout: 800}).then((response) =>{
               if(response.status === 200) {
                    return getStatusPin(urlDevice).then(n =>  n.digital[0])
               }else{
                    //return undefined
                    throw new Error("Something is wrong")
                }
           }).catch((error) =>{
              console.log("Erro: ", error.message)
              return false
          })
          
          return result
          } catch (error) {
              console.error(error.message)
          }    
}
//Para teste interno, solicita um array de saidas de pinos
const getStatus = async (url) => {
    const URL = `http://${url}:8090/status`.replace(/\s+/g, '');
    try {
        const result = await fetch(URL).then((response) =>{
           if(response.status === 200) {
                return true
            }else{
                //return undefined
                throw new Error("Something is wrong")
            }
       }).then((responseText) => {
        
        return responseText;
      }).catch((error) =>{
          console.log("Erro: Não foi possivel")
      })

      

      return result
      } catch (error) {
          console.error(error.message)
      }
}
//Envia ao dispositivo a nova senha da rede
const setWifiEsp = async (ssid = '', password = '') => {
    const URL = `http://${gatewayESP}/setting?ssid=${ssid}&pass=${password}`
    try {
        const result = await fetch(URL).then((response) =>{
            if(response.status === 200) {
                return true
            }else{
                return false
            }
       }).then((responseText) => {
        console.log(responseText)
        return responseText;
      }).catch((error) =>{
          console.log('Erro :')
          console.log(error.message)
          return false
      })

      

      return result
      } catch (error) {
          console.log(error.message)
      }
}

module.exports ={
    getAirTags,
    getStatus,
    connectDevice,
    desativarDevice,
    changeNameDevice,
    deleteDevice,
    vincMacDevice,
    createUser,
    authUser,
    setWifiEsp,
    forgetPassword,
    verifyCode,
    alterPassUser
}