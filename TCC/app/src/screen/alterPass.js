//Requerimentos necessários
import React, {useState, useEffect} from 'react'
import {StyleSheet, 
        View, 
        Text,
        KeyboardAvoidingView , 
        Animated
    } from "react-native";
import Toast from 'react-native-simple-toast'; 
import  {Button} from "../components/button";
import  InpTxtValue from "../components/InpTxtValue";
import {themeColor} from '../configStyle'
import {alterPassUser, authUser} from '../routes/control'
import {getData} from '../data/storage'
import Logo from '../components/Logo'


export default function ({navigation})  {


    const [usuario, setUsuario] = useState({
        cod: '',
        user: '',
        old_password: '',
        password: '',
        confirmPassword: ''
    })
    const [errPass, setErrPass] = useState([null])

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
    }, [usuario])

    //Inserção de senha
    const novaSenha = ( ) => {
        if(usuario.password === usuario.confirmPassword && usuario.old_password != ''){

            getData('auth').then(response => {
                authUser(response.user, usuario.old_password).then(auth => {
                    if(auth.hasOwnProperty('result')){

                        const key = auth.result
                        switch (key) {
                            case 'pass':
                                alterPassUser(response.user, usuario.password)
                                .then(result => {
                                    if(result.result == 'granted'){
                                        Toast.show('Senha alterada com sucesso')
                                        navigation.navigate('Login')
                                    }else{
                                        Toast.show('Ops..', result.message)
                                    }
                                    setUsuario(prev => ({ ...prev,  user: '',
                                    old_password: '',
                                    password: '',
                                    confirmPassword: ''}))
                                })
                                break;
                                
                                default:
                                    break;
                        }
                    }
                })
            })

               
           }else{
               console.log('Senhas não conferem')
               Toast.show('Senhas não conferem')
               console.log(usuario)
               setErrPass(styles.errPassStyle)
               console.log(errPass)
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
                    <Text style={[styles.text, styles.label]}>Digite sua senha antiga</Text>
                    <InpTxtValue 
                            value={usuario.old_password}  
                            style={errPass}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setErrPass(null)
                                    setUsuario(prev => ({...prev, old_password: text}));
                                }} secureTextEntry={true}  info = "Senha antiga"  />
                    <Text style={[styles.text, styles.label]}>Digite sua nova senha</Text>
                    <InpTxtValue 
                            value={usuario.password}  
                            style={errPass}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setErrPass(null)
                                    setUsuario(prev => ({...prev, password: text}));
                                }} secureTextEntry={true}  info = "Senha"  />
                    <InpTxtValue 
                            value={usuario.confirmPassword}  
                            style={errPass}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setErrPass(null)
                                    setUsuario(prev => ({...prev, confirmPassword: text}));
                                }} secureTextEntry={true}  info = "Confirmar senha"  />
                                
                                
                </KeyboardAvoidingView>
                
                <View style = {styles.groupButton}>
                    <Button addStyle = {styles.button} text = 'Confirmar'  
                        onPress = {novaSenha}
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
     errPassStyle: {
        borderColor: 'red',
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