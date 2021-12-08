//Requerimentos necessários
import React, {useState, useEffect} from 'react'
import {Alert, 
        StyleSheet, 
        View, 
        Text,
        KeyboardAvoidingView , 
        Dimensions,
        Animated,
        TouchableOpacity
    } from "react-native";

import  {Button} from "../components/button";
import Toast from 'react-native-simple-toast'; 
import  InpTxtValue from "../components/InpTxtValue";
import {themeColor} from '../configStyle'

import {authUser} from '../routes/control'
import {getData, storeData} from '../data/storage'
import Logo from '../components/Logo'

const {width, height} = Dimensions.get('screen')

export default function ({navigation})  {

    const [usuario, setUsuario] = useState({
        user: '',
        password: ''
    })

    const [offset, setOffset] = useState(new Animated.ValueXY({x: 0, y: 100}))
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    

    useEffect(() => {
        getData('auth').then((data) => {
            console.log("Tentativa", data)
            if(data!=null){
                authUser(data.user, data.password)
                .then(result => {
                    console.log(result)
                    if(result.result == 'pass'){
                        navigation.replace("Home");
                        navigation.navigate('Home')
                    }else{
                        console.log("Necessário login")
                    }
                })
            }
        })



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


//Requisita ao controller o login
    const handleLogin = ( ) => {
        if(isAlphaNumeric(usuario.user) != '' && usuario.password != '') {
            authUser(usuario.user, usuario.password)
            .then(result => {
                console.log(result)
                if(result.result == 'pass'){
                    storeData(usuario, 'auth').then(result => {
                        console.log(result)
                        setUsuario(prev => ({ ...prev,user: '',password: ''}))
                        navigation.navigate('Home')
                    })
                }else{
                    Alert.alert('Login', 'Login invalido')
                    setUsuario(prev => ({ ...prev, password: ''}))
                }
            })
        }else{
            Toast.show('Campos invalidos ou vazio')
        }
    }

    
    //Testa se existe caracteres invalidos
    const isAlphaNumeric = ch => {
        return ch.match(/^[a-z0-9 ^@._&]+$/i) !== null;
    }
    //Chama a tela de cadastro
    const handleCadastrar = ( ) => navigation.navigate('CadUser')
    //Chama a tela de esqueci a senha
    const handleForgetPass = ( ) => navigation.navigate('ForgetPass')


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
                    <InpTxtValue 
                            value={usuario.user}  
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setUsuario(prev => ({...prev, user: text}));
                                }}  info = "Usuario" keyType='default'  ></InpTxtValue>
                    <InpTxtValue 
                            value={usuario.password}  
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setUsuario(prev => ({...prev, password: text}));
                                }} secureTextEntry={true}  info = "Senha"  ></InpTxtValue>
                </KeyboardAvoidingView>
                <View style = {styles.groupButton}>
                    <Button addStyle = {styles.button} text = 'Entrar' 
                        onPress = {handleLogin}
                    />
                    <Button addStyle = {styles.button} text = 'Criar conta'  
                        onPress = {handleCadastrar}
                    />
                    <TouchableOpacity onPress = {handleForgetPass}>
                        <Text style={styles.text}>Esqueci a senha</Text>
                    </TouchableOpacity>
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