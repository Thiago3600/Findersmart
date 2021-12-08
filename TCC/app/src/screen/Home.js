//Requerimentos necessários
import React, {useEffect} from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {themeColor} from '../configStyle'
import FlatButton from "../components/button";
import TextFont from "../components/TextFont";
import {getData, storeData} from '../data/storage'
import { BackHandler } from 'react-native';
import Buttons from "../components/Buttons"


export default function ({navigation})  {
  // Chamada de telas
  const handleFind = () => {
    navigation.navigate("Radar")
  }
  const handleHelp = () => {
    navigation.navigate('Help', )
  }

  const handleAirTags = () => {
    navigation.navigate('cadastro')
  }
  
  const handleList = () => {
    navigation.navigate('Airtags')
  }
  const handleLogin = () => {
    navigation.navigate('Login')
  }



  //Lida com o botão de voltar
  function handleBackButtonClick() {
      if (navigation.canGoBack()) {
        console.log('Back button')
      } else {
        console.log('Exit')
        BackHandler.exitApp()
      }
    }

    
    useEffect(() => {
      //Add listener ao bota de voltar
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);

 
  
    return(
      <View style={styles.container}>
        <TextFont addStyle={styles.title} text='FinderSmart' font = 'Brush-Script-MT' />
        <View style = {styles.grid} >
          <View style = {styles.line} >
            <FlatButton text = 'AirTags' icon = 'plusSign' onPress = {handleAirTags} />
            <FlatButton text = 'Radar' icon = 'location' onPress = {handleFind} />
          </View>
          <View style = {styles.line} >
            <FlatButton text = 'List' icon = 'list' onPress = {handleList} />
            <FlatButton text = 'Help' icon= 'help' onPress = {handleHelp} />
          </View>
        </View>
        <View style = {{flexDirection: 'row'}} >
        <Buttons 
            name='exit-outline' 
            info='Logoff' 
            color='black' 
            style={styles.exitApp}
            onPress={() => {
              
              Alert.alert("Sair?", "Deseja deslogar de FinderSmart?", [
                {
                  text: "Não",
                  onPress: () => null,
                },
                { text: "Sim", onPress: () => {
                  storeData(null, 'auth').then(handleLogin)
                  
                } }
              ])
            }}
          />
        <Buttons 
            name='key-outline' 
            info='Alterar senha' 
            color='black' 
            style={styles.exitApp}
            onPress={() => {
              
              Alert.alert("Senha", "Deseja alterar a senha de acesso?", [
                {
                  text: "Não",
                  onPress: () => null,
                },
                { text: "Sim", onPress: () => {
                  //storeData(null, 'auth').then(handleLogin)
                  navigation.navigate('alterPass')
                } }
              ])
            }}
          />
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: themeColor.primaryColor,
  },
  grid:{
    // flex: 1,
    padding: 6,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // backgroundColor: '#ffffff',
    backgroundColor: "#61dafb",
    borderRadius: 18,
    backgroundColor: themeColor.primaryColor,
  },
  exitApp:{
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 3,
  },  
  line: {
    flex: 1,
    paddingTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    fontSize: 80,
    // borderWidth: 4,
    // borderColor: "#20232a",
    // fontFamily: 'Brush-Script-MT',
    borderRadius: 18,
    backgroundColor: themeColor.primaryColor,
    // backgroundColor: "#61dafb",
    color: "#fff",
    textAlign: "center",
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },

});