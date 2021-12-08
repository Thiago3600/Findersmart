//Requerimentos necessários
import React, { useState, Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'

//InputText com mascara de texto
export default ({
        info, 
        mask, 
        onChangeText, 
        secureTextEntry,
        style = null, 
        flex = 0, 
        value = '', 
        keyType='default',
        autoCapitalize='none',
        // autoCorrect={false}
        // autoCompleteType='email'

    }) => {

    const estilo = [styles.container]

    if(style){
        estilo.push(style)
    }

    const [valueText, setValueText] = useState([{
        texto: null
    }])

    const [styleFoco, setStyleFoco] = useState({})

    const placeholder = "".concat(info || '')



    return (
        <View style={estilo} >
            <Text style={styles.info} >{info}</Text>
            <View style={styles.line} >

            {
                mask ?  
                <TextInputMask 
                    type={'custom'}
                    options={{
                        mask: mask
                        // mask: 'SS:SS:SS:SS:SS:SS'
                    }}
                    secureTextEntry={secureTextEntry}
                    style={styles.input}
                    onChangeText={onChangeText}
                    autoCapitalize={autoCapitalize}
                    placeholder={placeholder}
                    keyboardType={keyType}
                    value={value || valueText.texto}
                /> : 

                <TextInput
                    style={[styles.input, styleFoco]}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyType}
                    value={value || valueText.texto}
                    autoCapitalize={autoCapitalize}
                    // autoCorrect={false}
                    // autoCompleteType=''
                    // onFocus={styles.foco}
                />


            }


               
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        maxWidth: '100%',
        alignItems: 'center',
        marginVertical: '3%',
        marginHorizontal: '1%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 2,
        paddingHorizontal: 5,
        borderColor: '#0DADFF'
    },
    info:{
        color:'#0DADFF'
    },
    line: {
        flex: 0,
        flexDirection: 'row',
        
        minWidth: '100%',
    },
    input: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#EEE',
        borderRadius: 10,
        color: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 3,
    },
    foco:{
        borderColor: '#FF27E8'
    },
    borderFont:{
        borderColor: '#FF27E8'
    }
})