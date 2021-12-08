//Requerimentos necessários
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

//botão com icone
export default function BtIcon({name = 'add-outline', size = 40, color = 'green', opacity = 0.8, styleV = null, onPress = null}){


    const estiloV = []

    styleV?estiloV.push(styleV):estiloV.push(styles.btView)


    return(
        <View>
            <TouchableOpacity onPress={onPress} activeOpacity={opacity} style={styles.btView} >
                <Ionicons name={name} size={size} color={color} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btView:{
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
    },
})