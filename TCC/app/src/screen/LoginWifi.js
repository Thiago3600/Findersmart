/*Requerimentos necessarios*/

import React, {useState, useEffect} from 'react'
import {StyleSheet, 
        View, 
        KeyboardAvoidingView , 
        Dimensions,
        Animated
    } from "react-native";

import  {Button} from "../components/button";
import  InpTxtValue from "../components/InpTxtValue";
import {themeColor} from '../configStyle'
import {setWifiEsp} from '../routes/control'
import LogoLottie from '../components/LogoLottie'

const {width, height} = Dimensions.get('screen')

export default function ({navigation})  {

    const [wifi, setWifi] = useState({
        ssid: '',
        password: ''
    })
    const [play, setPlay] = useState(false)

    const [offset, setOffset] = useState(new Animated.ValueXY({x: 0, y: 100}))
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    

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

    //Lidar com o login, requisita ao controller

    const handleLogin = ( ) => {

        console.log('Wifi')
        setPlay(true)
        setWifiEsp(wifi.ssid, wifi.password).then((bol) => {
            console.log(bol)
            if(bol){
                navigation.navigate('Home')
            }else{
                setWifi({
                    ssid: '',
                    password: ''
                })
            }
            setPlay(false)
        })
    }

    



    return (
        <View style = {styles.backgroud}>
            <LogoLottie play={play} onPress={() => {
                console.log('PressWifi')
                
            }} />
            <Animated.View style = {[styles.container, {
                opacity: opacity,
                transform:[
                    { translateY: offset.y}
                ]
            }]}>
                <KeyboardAvoidingView style={{flex: 0}}>
                    <InpTxtValue 
                            value={wifi.ssid}  
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setWifi(prev => ({...prev, ssid: text}));
                                }}  info = "Nome da rede (SSID)" keyType='default'  ></InpTxtValue>
                    <InpTxtValue 
                            value={wifi.password}  
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                    setWifi(prev => ({...prev, password: text}));
                                }} secureTextEntry={true}  info = "Senha da rede"  ></InpTxtValue>
                </KeyboardAvoidingView>
                <View style = {styles.groupButton}>
                    <Button addStyle = {styles.button} text = 'Gravar' 
                        onPress = {handleLogin}
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
        flex: 0,
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
})