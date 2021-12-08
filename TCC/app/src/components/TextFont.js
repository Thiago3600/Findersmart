//Requerimentos necessarios
import React, {useState} from 'react'
import {Text, StyleSheet} from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

//Exporta fontes utilizadas no app
export default function TextFont ({addStyle = null, text = '', font = ''}) {
    const getFonts = () => Font.loadAsync({
        'Brush-Script-MT':  require('../../assets/fonts/brush-script-mt-kursiv.ttf'),
        'PaletteMosaic':    require('../../assets/fonts/PaletteMosaic-Regular.ttf'),
    })
    
    
    const [fonstsLoaded, setFontsLoaded] = useState(false);
   
    let estilo = [styles.null]
    if (font == 'Brush-Script-MT') {
        // console.warn(font)
        estilo = [styles.BrushScriptMT]
    } else if (font == 'PaletteMosaic') {
        // console.warn(font)
        estilo = [styles.PaletteMosaic]
    }
    

    if(addStyle){
        estilo.push(addStyle)
    }

    
    if (fonstsLoaded) {
        return(
            
                <Text style={estilo}>{text}</Text>       
        )
    } 
    else {
        return (
            <AppLoading 
                startAsync ={getFonts} 
                onFinish = {() => setFontsLoaded(true)}
                onError={console.warn}
            />
        )
    }
}

const styles = StyleSheet.create({
    null: {},
    BrushScriptMT: {
        fontFamily: 'Brush-Script-MT',
    },
    PaletteMosaic: {
        fontFamily: 'PaletteMosaic',
    }
})
