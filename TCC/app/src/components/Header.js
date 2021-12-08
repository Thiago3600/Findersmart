//Requerimentos necessários
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'

//header
export default function ({title = 'Sem titulo'}){
 return(
        <View style={styles.container} >
            <View style={styles.headTitles} >
                <Text style={styles.txtHeadTitle} >{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        paddingVertical: 0,
    },
    headTitles: {
        paddingVertical: 15,
        justifyContent: 'center',
        backgroundColor: '#00A2E8',
        borderBottomStartRadius:  20,
        borderBottomEndRadius:  20,
        borderBottomWidth: 3,
        borderStartWidth: 1,
borderEndWidth: 1,
    },
    txtHeadTitle: {
        alignSelf: 'center',
        fontSize: 32,
        color: 'white',
    },
})