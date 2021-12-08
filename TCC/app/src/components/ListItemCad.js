//Requerimentos necessários
import React, { Component, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icons from './Icons'

//Item da lista de cadastro
export default function ListItemCad({onClickIcon, name='Unknown' }){

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={styles.deviceTXT} >{name}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
            }}>
                <Icons name="add-outline" onPress={onClickIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: '#CCC',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 3,
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: 2,
        
    },
    status: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: "green",
        alignSelf: 'center',
    },
    deviceTXT:{
        marginHorizontal: 10,
        fontSize: 24,
        alignSelf: 'center',

    },
})