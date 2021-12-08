import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, Dimensions } from 'react-native';
import {themeColor,icons} from '../configStyle'

//Botao simples
export function Button ({addStyle = null, text, onPress}) {
    let estilo = [styles.defButton]

    if(addStyle){
        estilo.push(addStyle)
    }
    return (
        <TouchableOpacity onPress = {onPress}>
            <View style = {estilo}>
                <Text style = {styles.defButtonText}>{text}</Text>
            </View>
        </TouchableOpacity> 
    )
} 

export default function FlatButton ({addStyle = null, text, onPress, icon }) {
    
    let estilo = [styles.button]

    if(addStyle){
        estilo.push(addStyle)
    }

    return (
        <TouchableOpacity onPress = {onPress}>
            <View style = {estilo}>
                <ImageBackground style = {styles.image} source={icons.buttonIcons[icon]} />
                <Text style = {styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity> 
    )

}

const styles = StyleSheet.create({
    defButton:{
        padding: 20,
        justifyContent: 'space-around',
    },
    defButtonText:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // backgroundColor: 'white',
        // borderColor: "#20232a",
        
    },
    image: {
        flex: 0, 
        width: (Dimensions.get('screen').width / 2) * 0.75, 
        height: (Dimensions.get('screen').width / 2) * 0.75, 
        alignItems: 'center'
    },
    buttonText : {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})