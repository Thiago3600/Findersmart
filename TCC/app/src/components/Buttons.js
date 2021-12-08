//Requerimentos necessários
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

//Botoes
export default function Icons({info = '', onPress, name = 'stop-outline', style = false, size = 32, color = 'green'}){

    const estilo = [styles.container]

    if(style){
        estilo.push(style)
    }


    return(
        <TouchableOpacity style={estilo} onPress={onPress}>
            <Ionicons name={name} size={size} color={color} />
            {
                info!=''?<Text style={styles.text}>{info}</Text>:null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'flex-end',
    },
    text:{
        alignSelf: 'center',
        paddingHorizontal: 5,
    }
})