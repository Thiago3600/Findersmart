//Requerimentos necessários
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native'
import ListItemRad from '../components/listItemRad'
import ChoseName from '../components/ChoseName'
import Header from '../components/Header';
import {getAirTags, getStatus, changeNameDevice, deleteDevice} from '../routes/control'

export default function (){

    const [state, setState] = useState({
        id: 0,
        showScreen: false,
        
    })
    const [data, setData] = useState([])
    const [lock, setLock] = useState("unlock")

    //Hook para listagem de devices e verificar se estão online
    useEffect(() => {
        getAirTags().then((air) => {
            console.log('Hello from', air)
            setData(air)
        })
        .catch((error) => console.error(error))
        .then(() => console.log("Não foi possivel buscar..."))


        const interval = setInterval(() => {
            getAirTags().then((air) => {
                console.log('Hello from', air)
                setData(air)
            })
            .catch((error) => console.error(error))
            .then(() => console.log("Não foi possivel buscar..."))
          }, 60000);
          return () => clearInterval(interval);
    }, [lock])

    
    //Busca o id de device
    const findInd = (id) => data.findIndex(elemento => elemento.AIRNID_AIR === id )

    //Solicita mudança de nome ao controller
    const changeNameAirtag = (name) => {
        if(name === '' || name === undefined || name === null){
            Alert.alert('Nome Invalido', 'O campo esta vazio, coloque um nome ou cancele a ação!')
        }else{  
            changeNameDevice(state.id, name).then((result) => {
                console.log(result)
                if(result.hasOwnProperty('result')){
                    if(result.result == 'sucess'){
                        getAirTags().then((air) => {
                            console.log('Hello from', air)
                            setData(air)
                        })
                        .catch((error) => console.error(error))
                        .then(() => console.log("Não foi possivel buscar..."))
                    }
                }
            })
            setLock("unlock")
        }
        setState({showScreen: false})
    }
    //Solicita a exclusão de device
    const deleteAirtag = (id) => {
        Alert.alert(`Excluir airtag?`, `Deseja excluir airtag: ${data[findInd(id)].AIRNID_AIR}`, [
            {
              text: "Sim",
              onPress: () =>{
                   console.log("Sim")
                    deleteDevice(id).then((result) => {
                        console.log(result)
                        if(result.hasOwnProperty('result')){
                            if(result.result == 'sucess'){
                                getAirTags().then((air) => {
                                    console.log('Hello from', air)
                                    setData(air)
                                })
                                .catch((error) => console.log("Não foi possivel chamar o dispositivo"))
                                .then(() => console.log("Não foi possivel buscar..."))
                            }
                        }
                    })
                    setLock("unlock")
                   //setData(dados);
              }
            },
            { text: "Não", onPress: () => console.log("Não") }
          ])

    }

    return (
        <View style={styles.container}>
            <Header title="Airtags" />
            <ChoseName isVisible={state.showScreen} setName={changeNameAirtag} onCancel={() => setState({showScreen: false})} />
            <Text style={styles.title}>Lista de Airtags</Text>
            <View style={{
                alignItems: 'center',
            }}>
            <FlatList
                keyExtractor={() => Math.random().toString()}
                data={data}
                numColumns={2}
                renderItem={({item}) => 
                        <ListItemRad 
                               
                                name={item.AIRCDESCRI} 
                                getStatus={async () => {
                                    return await getStatus(item.AIRCIP_ADR).then(result => {return result}).catch((error) => console.log("Não foi possivel chamar o dispositivo"))}
                                }                                
                                onCLickEditName={() => setState({showScreen: true, id: item.AIRNID_AIR})} 
                                onClickDelete={() => deleteAirtag(item.AIRNID_AIR)}
                            /> 
                }
            /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',   
    },
    title:{
        fontSize: 24,
        alignSelf: 'center',
        paddingVertical: 10,
        color: 'black'
    }
})