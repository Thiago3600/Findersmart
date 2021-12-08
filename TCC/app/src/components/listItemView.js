//Requerimentos necessários
import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import Icons from './Icons'

//Item de uma lista
export default function ListItemView({onCLickEditName, onClickDelete, name='Unknown', status }){

    const sizeIcon = 25;

    let estado = 'red'

    console.log(status)

    if(status)estado = 'green'


    return (
        <View style={styles.container}>
            
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={[styles.status, {backgroundColor: estado}]}></View>
                <Text style={styles.deviceTXT} >{name}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
            }}>
                <Icons name="pencil-outline" size={sizeIcon} onPress={onCLickEditName} />
                <Icons name="trash-sharp" size={sizeIcon} onPress={onClickDelete} />
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
        alignSelf: 'center',
        borderWidth: 1,
    },
    deviceTXT:{
        marginHorizontal: 10,
        fontSize: 24,
        alignSelf: 'center',

    },
})