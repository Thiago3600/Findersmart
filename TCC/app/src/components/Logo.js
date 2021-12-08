//Requerimentos necessários
import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, Animated, Keyboard} from 'react-native'

const {width, height} = Dimensions.get('screen')

export default function ({sizelogo = null, style = null, imgsrc = ''}) {

    const [logo] = useState(new Animated.ValueXY({x: sizelogo==null?width/2:sizelogo , y: sizelogo==null?width/2:sizelogo }))


    useEffect(() => {

        //Animação da logo
        if(sizelogo!=null){
            //console.log("Hey you", sizelogo)
            Animated.parallel([
                Animated.timing(logo.x, {
                    toValue: sizelogo,
                    duration: 10,
                    useNativeDriver: false
                }),
                Animated.timing(logo.y, {
                    toValue: sizelogo,
                    duration: 10,
                    useNativeDriver: false
                })
            ]).start()
        }


        //Add listener de teclado
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            keyboardDidShowListener("Keyboard Shown");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            keyboardDidHideListener("Keyboard Hidden");
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
    }, [])

    //Caso o teclado estiver ativado alterna o tamanho da logo
    function keyboardDidShowListener (status = 'none'){
        //console.log(status)
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 55,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: 55,
                duration: 100,
                useNativeDriver: false
            })
        ]).start()
    }
    //Caso o teclado estiver ativado alterna o tamanho da logo
    function keyboardDidHideListener (status = 'none'){
        //console.log(status)
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: width/2,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(logo.y, {
                toValue: width/2,
                duration: 100,
                useNativeDriver: false
            })
        ]).start()
    }

    return(
        <View style={[styles.container]}>
            <Animated.Image style={{
                width: logo.x,
                height: logo.y,
            }} source={imgsrc!=''?imgsrc:require('../../assets/logo/logoLogin.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        // backgroundColor: 'green',
        alignSelf: 'center',
        margin: 15,
    },
    image: {
        flex: 1,
    }
})

