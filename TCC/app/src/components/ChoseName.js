//Requerimentos necessários
import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import InputText from './InputText';
import Icons from './Icons'

//Modal para a tela de mudança de nomes
export default ({isVisible, onCancel, setName}) => {

    const [nome, setNome] = useState('')

    return(
        <Modal transparent={true} visible={isVisible} onRequestClose={onCancel} animationType='slide'>
          
            <TouchableWithoutFeedback onPress={onCancel}>
                <View  style={styles.background} >
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container} >
                        <Text style={styles.text} >Crie um nome para seu AirTag</Text>
                        <InputText info='Nome' onChangeText={txt => setNome(txt)} />
                        <Icons name="md-checkmark-circle" size={65} color="green" onPress={() =>{
                                                                                                setName(nome)
                                                                                                setNome('')
                                                                                            }
                                                                                        } />
                        <Icons name="close-circle" size={65} color="red" onPress={onCancel} />
            </View>
 
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        minHeight: 280,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 2,
        
    },
    text:{
        fontSize: 24,
        textAlign: 'center',
    },
    containerRow: {
     
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '0.5%',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    background:{
        // elevation: -1,
        flex: 10,
        height: '100%',
   
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})