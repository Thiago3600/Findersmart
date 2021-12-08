//Requerimentos necessários
import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, View, ScrollView, Animated } from "react-native";
import  {Button} from "../components/button";
import  InpTxtValue from "../components/InpTxtValue";
import {themeColor} from '../configStyle'
import {createUser} from '../routes/control'
import Logo from '../components/Logo'



export default function ({navigation})  {

    const [usuario, setUsuario] = useState({
        user: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errPass, setErrPass] = useState([null])
    const [offset, setOffset] = useState(new Animated.ValueXY({x: 0, y: 100}))
    const [opacity, setOpacity] = useState(new Animated.Value(0))

    //Hook para animação da tela
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

    //Valida email
    function validarEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    //Testa se é alfanumerico
    const isAlphaNumeric = ch => {
        return ch.match(/^[a-z0-9 ^@_&]+$/i) !== null;
    }
    //Lida com o cadastro de usuario validando se existe usuario ou não
    const handleCadastrar = ( ) => {
         if(isAlphaNumeric(usuario.user) != '' && validarEmail(usuario.email) && isAlphaNumeric(usuario.password) != '' && isAlphaNumeric(usuario.confirmPassword) != ''){
            console.log("Pass")
            
            if(usuario.password === usuario.confirmPassword){
                createUser(usuario.user, usuario.email, usuario.password)
                .then(result => {
                    if(result.result == 'sucess'){
                        Alert.alert('Sucesso', 'Usuario criado com sucesso!')
                        navigation.navigate('Login')
                    }else{
                        Alert.alert('Ops..', result.message)
                    }
                    setUsuario(prev => ({ ...prev,  user: '',
                                                    email: '',
                                                    password: '',
                                                    confirmPassword: ''}))
                })
            }else{
                console.log('Senhas não conferem')
                Alert.alert('Erro', 'Senhas não conferem')
                console.log(usuario)
                setErrPass(styles.errPassStyle)
                console.log(errPass)
            }
        }
    }

    return (
        <ScrollView style = {styles.backgroud}>
            <Logo />
            <View style = {styles.container}>
                <Animated.View style = {{
                    opacity: opacity,
                    transform:[
                        { translateY: offset.y}
                    ]
                }}>
                    <InpTxtValue 
                            value={usuario.user}  
                            autoCapitalize='sentences'
                            onChangeText={(text) => {
                                    setUsuario(prev => ({...prev, user: text}));
                                }}  info = "Nome de usuário"  />
                    <InpTxtValue 
                            value={usuario.email} 
                            autoCapitalize='none' 
                            onChangeText={(text) => {
                                    let t = text.toLowerCase()
                                    setUsuario(prev => ({...prev, email: text.toLowerCase()}));
                                }}  info = "Email"  />
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
                </Animated.View>
                <View style = {styles.groupButton}>
                    <Button addStyle = {styles.button} text = 'Confirmar'  
                        onPress = {handleCadastrar}
                    />
                </View>
            </View>
        </ScrollView>
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
     },
     errPassStyle: {
        borderColor: 'red',
     },
     backgroud:{
        flex: 1,
        // justifyContent: 'center',
        padding: 20,
        backgroundColor: themeColor.primaryColor,
     },
})