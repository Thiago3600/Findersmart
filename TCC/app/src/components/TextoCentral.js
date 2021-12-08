//Requerimentos necessários
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native'

//Componente responsavel por centralização de texto
export default props => {
    let cor = '#000'
    if (props.corFundo) cor = props.corFundo

    return(
        <View style={[styles.container, {backgroundColor: cor}]}>
            <Text style={styles.textContainer}>
                {props.children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    textContainer: {
        fontSize: 50,
        color:'#FFF',
    }
})