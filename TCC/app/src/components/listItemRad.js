//Requerimentos necessários
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icons from './Icons'
import Logo from './Logo';

const {width} = Dimensions.get('screen')

//Lista item da tela radar
export default function ListItemRad({
        onCLickEditName, 
        onClickDelete, 
        onPress, 
        name='Unknown', 
        getStatus, 
        sendSignal 
    }){

    const sizeIcon = 25;

    const [status, setStatus] = useState(false)
    
    const [estado, setEstado] = useState('red')
    const [play, setPlay] = useState(false)
    

    //setInterval(function(){ console.log("Hello"); }, 3000);

    const statusPin = async () => {
        try {
            await onPress().then(n => setPlay(n==1))            
        } catch (error) {
            console.log(error.message)
        }
    }
 



    useEffect(() => {
        if(status){
            setEstado('green')
        }else{
            setEstado('red')
        }

        const interval = setInterval(() => {
            getStatus().then(result => setStatus(result))
          }, 1500);
          return () => clearInterval(interval);


    }, [status, play])


    return (
        <View style={styles.container} >
            {
                sendSignal?null:
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingTop: 3,
                }}>
                    <Icons name="trash-sharp" size={sizeIcon} color='black' onPress={onClickDelete} />
                    <Icons name="pencil-outline" size={sizeIcon} color='black' onPress={onCLickEditName} />
                </View>
            }
            <TouchableOpacity  activeOpacity={0.6} onPress={statusPin}>
                <View style={styles.box}>
                    <Logo sizelogo={100} imgsrc={require('../../assets/buttons/plusSign.png')}  />
                    <View style={styles.info}>
                        <View style={[styles.status, {backgroundColor: estado}]}></View>
                        <Text style={styles.deviceTXT} >{name}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    {/* <Icons name="locate-outline" size={sizeIcon}  /> */}
                </View>
            </TouchableOpacity>   
                     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        width: width / 2.1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'black'
        
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
    info:{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box:{

    }
})