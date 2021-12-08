//Requerimentos necessários
import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, BackHandler} from 'react-native'
import ListItemRad from '../components/listItemRad'
import Header from "../components/Header";
import {getAirTags, getStatus, connectDevice, desativarDevice} from '../routes/control'



export default function ({navigation}){
    const [data, setData] = useState([])
    const [lock, setLock] = useState("unlock")
    const [visible, setVisible] = useState(true)

    //Lidar com o botão de voltar do celular 
    function handleBackButtonClick() {
        if (navigation.canGoBack()) {
          console.log('Back button on Radar', data)
          getAirTags().then((air) => {
                air.forEach((tag) => {
                    const ip = tag.AIRCIP_ADR
                    desativarDevice(ip)
                })
            })
            .catch((error) => console.log(error))
            .then(() => console.log("Não foi possivel buscar..."))
          
        } else {
          console.log('Else Back button on Radar')
        }
      }
  
  
    //hook para atualização da tela e de variaveis
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        getAirTags().then((air) => {
            //console.log('Hello from', air)
            setData(air)
        })
        .catch((error) => console.log(error))
        .then(() => console.log("Não foi possivel buscar..."))


        const interval = setInterval(() => {
            getAirTags().then((air) => {
                //console.log('Hello from', air)
                setData(air)
            })
            .catch((error) => console.error(error))
            .then(() => console.log("Não foi possivel buscar..."))
          }, 60000);
          return () => {
              clearInterval(interval);
              BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
            }
    }, [lock])




    return(
        <View style={styles.container}>
            <Header title='Radar' />
            <Text style={styles.titulo} >Selecione o dispositivo</Text>
            <View style={{
                alignItems: 'center',
            }}>
            {/* listagem de dispositivos */}
            <FlatList 
                keyExtractor={() => Math.random().toString()}
                data={data}
                numColumns={2}
                renderItem={({item}) => 
                        <ListItemRad
                                name={item.AIRCDESCRI} 
                                sendSignal
                                getStatus={async () => {
                                    return await getStatus(item.AIRCIP_ADR).then(result => {return result})}
                                }
                                //onPress={searchAirTag}
                                onPress={async () => {
                                    return await connectDevice(item.AIRCIP_ADR).then(result => {
                                        console.log("Result", result)
                                        return result
                                    })}
                                }
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
        width: '100%',
        marginHorizontal: 0,
    },
    titulo: {
        fontSize: 24,
        padding: 5,
        
        alignSelf: 'center',
    }
})