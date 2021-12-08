//Requerimentos necessários
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import Header from '../components/Header'
import InpTxtValue from '../components/InpTxtValue'
import Buttons from '../components/BottomButton'
import {getData} from '../data/storage'
import {vincMacDevice} from '../routes/control'



export default function ({navigation}){



    const [state, setState] = useState({
        id: 0,
        showScreen: false,
        
    })
    const [showVin, setShowVin] = useState(false)

    const [mac, setMac] = useState('')

    //Se usuario for conectar dispositivo a rede
    const conexaoWifi = () => {
        Alert.alert(`Conectar dispositivo?`, `Para a conexão de um novo dispositivo, você precisa se conectar a rede wifi do dispositivo voltar inserir o nome e a senha de sua rede na pagina a seguir`, [
            {
              text: "Sim",
              onPress: () =>{
                navigation.navigate('LoginWifi')
              }
            },
            { text: "Não", onPress: () => console.log("Não") }
          ])

    }
      


    return (
        <View style={styles.container}>
            <View>
                <Header title='Cadastro' />
            </View>

            <View style={styles.bodyQt}>
                <TouchableOpacity style={styles.question} onPress={()=> {
                    conexaoWifi()
                }}>
                    <Text style={[styles.form, styles.formBT]}>Deseja conectar um novo airtag?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.question} onPress={() => setShowVin((prev) => !prev)} >
                    <Text style={[styles.form, styles.formBT]}>Deseja vincular um novo airtag?</Text>
                </TouchableOpacity>
            </View>
            
            {
                    showVin?<View style={styles.body}>
                                <View>
                                    <Text style={styles.title}>Vincular airtags</Text>
                                    <Text style={styles.form} >Para vincular, digite o endereço MAC do dispositivo, somente letras e numeros</Text>
                                    <InpTxtValue info='MAC' mask='SS:SS:SS:SS:SS:SS' autoCapitalize='characters' value={mac}  onChangeText={(text) => {setMac(text);}}/>
                                    <Text style={styles.form}>Antes da inclusão certifique-se de que o dispositivo esteja ligado e conectado a sua rede WIFI</Text>
                                </View>
                                <View style={styles.bottomBt} >
                                    <Buttons name="close-circle-outline" size={50} color={'red'} onPress={()=>{ setShowVin(false)}} />
                                    <Buttons name="add-circle-outline" size={50} color={'green'} onPress={()=>{ 
                                            getData('auth').then(response => {
                                                vincMacDevice(mac, response).then(response =>{
                                                    if(response.hasOwnProperty('result')){
                                                        if(response.result == 'sucess'){
                                                            Alert.alert("Sucesso", 'Dispositivo cadastrado com sucesso!')
                                                            setMac('')
                                                        }else{
                                                            Alert.alert("Ops..", 'Não foi possivel cadastrar o dispositivo!')
                                                        }
                                                    }
                                                    console.log('resultado: ',response);
                                                }) 
                                            }) 
                                            console.log('OK')
                                        }} />
                                </View>
                            </View>
                            :null
            }
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',   
        justifyContent: 'space-between',
    },
    body: {
        flex: 3,
        justifyContent: 'space-between',
    },
    bodyQt: {
        flex: 1,
        justifyContent: 'center',
    },
    title:{
        fontSize: 24,
        alignSelf: 'center',
        paddingVertical: 10,
        color: 'black'
    },
    form:{
        fontSize: 18,
        alignSelf: 'center',
        paddingHorizontal: 10,
        color: 'black'
    },
    bottomBt:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        backgroundColor: '#AADBEB',
        borderRadius: 15
    },
    question:{
        flex: 0, 
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B63FA',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 10,

    },
    formBT:{
        color: 'white',
    }
})