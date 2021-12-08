//Requerimentos necessários
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import LottieView from 'lottie-react-native'


export default function ({play = false, onPress}){
    const progress = useRef(new Animated.Value(0)).current;

    //Cria a animação da logo
    const handleLogoAnimation = () => {
        Animated.timing(progress, {
        toValue: 0.6,
        duration: 2000,
        useNativeDriver: true,
        }).start();
    };

    const animation = React.useRef(null)

    const [state, setState] = useState({
        autoplay: true,
    })

    useEffect(() => {
        handleLogoAnimation();
        if(play){
            animation.current.play();
            setState((prevState) => ({...prevState, autoplay: true}))
        }else{
            animation.current.reset();
        }
    }, [play, animation])
    

    return(
        
            <View style={styles.container} >
                <TouchableOpacity style={styles.lottie} onPress={onPress} >
                    <LottieView
                        ref={animation}  
                        autoplay={play}
                        loop={true}
                        speed={3}
                        progress={progress}
                        source={require('../../assets/lottie/64273-wifi.json')}  />
                </TouchableOpacity>
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
        width: '50%',
        maxHeight: '20%',
        paddingVertical: 3,
        marginVertical: 0,
        justifyContent: 'flex-start',
        
        alignSelf: 'center',
        borderRadius: 7,
    },
    lottie: {
        flex: 1,

        marginVertical: 0,
     
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },

        
    
})