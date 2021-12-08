//Requerimentos necessários
import AsyncStorage from "@react-native-async-storage/async-storage";

//Guarda dados quando solicitados a memoria do celular
const storeData = async (value, name) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`@${name}`, jsonValue)
        return 'sucess'
    } catch (e) {
        // saving error
    }
}
//Recupera dados quando solicitados
const getData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(`@${name}`)
      if(value !== null) {
        return JSON.parse(value)
      }
    } catch(e) {
      // error reading value
      return false
    }
  }

module.exports ={
    getData,
    storeData,
}