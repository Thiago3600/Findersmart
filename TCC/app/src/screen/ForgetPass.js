//Requerimentos necessários
import React, {useState, useEffect} from 'react'
import {StyleSheet, 
        View, 
        Text,
        KeyboardAvoidingView , 
        Animated,} from "react-native";
import Toast from 'react-native-simple-toast';
import {Button} from "../components/button";
import InpTxtValue from "../components/InpTxtValue";
import {themeColor} from '../configStyle'
import {forgetPassword} from '../routes/control'
import Logo from '../components/Logo'

export default function ({navigation})  {

    const [usuario, setUsuario] = useState({
        email: '',
    })

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 100}))
    const [opacity] = useState(new Animated.Value(0))
    

    useEffect(() => {
         Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start()
    }, [])

    //Valida se é um email valido

    function validarEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    //Solicita um codigo de verificação ao controller
    const envioCod = () => {
        ///console.log("PassBefore", validarEmail(usuario.email), usuario.email)
        if( validarEmail(usuario.email) ){
            console.log("Pass")
            forgetPassword(usuario.email).then(result => {
                if( result.hasOwnProperty('result')){
                    const key = result['result']
                    console.log(key)
                    switch (key) {
                        case 'pass':
                            Toast.show('Email enviado com sucesso')
                            navigation.navigate('CodVerify')
                            break;
                        case 'Email not found':
                            console.log("Email not found")
                            Toast.show('Email não cadastrado')
                            break;
                    
                        default:
                            console.log("Email não enviado")
                            Toast.show('Email não enviado')
                            break;
                    }                   
                }
                
            })
            
        }
    }


    return (
        <View style = {styles.backgroud}>
            <Logo size={10} />
            <Animated.View style = {[styles.container, {
                opacity: opacity,
                transform:[
                    { translateY: offset.y}
                ]
            }]}>
                <KeyboardAvoidingView>
                    <Text style={[styles.text, styles.label]}>Digite o email de verificação</Text>
                    <InpTxtValue 
                            value={usuario.email}  
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setUsuario(prev => ({...prev, email: text}));
                                }}  info = "Email" keyType='email-address'  ></InpTxtValue>
                </KeyboardAvoidingView>
                <View style = {styles.groupButton}>
                    <Button addStyle = {styles.button} text = 'Enviar o codigo'  
                        onPress = {envioCod}
                    />
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10, 
        borderWidth: 2,   
        fontSize: 25,
        padding: 8,
    },
    container:{
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0,
        justifyContent: 'center',
        
    },
    label: {
        fontSize: 18,
    },
    groupButton: {
        justifyContent: 'center',
        padding:20,
        flex: 0,
        justifyContent: 'space-around',
     },
    button:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: 15,
        marginVertical: 10,
     },
     
     backgroud:{
        flex: 1,
        justifyContent: 'center',

        padding: 20,
        backgroundColor: themeColor.primaryColor,
     },
     text: {
         marginTop: 10,
         textAlign: 'center',
     }
})