//Requerimentos necessários
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import Header from '../components/Header'



export default function ({navigation}){

    //Textos com o manual de como utilizar o app
    const titulo1 = "Conectar Airtag a rede"
    const passo1_1 = `Para conectar seu airtag, primeiro deve ligar o dispositivo e se conectar a rede Wifi de FinderSmart do seu celular.`
    const passo1_2 = `Vá ao menu Airtags e clique em Deseja conectar um novo airtag, irá aparecer um aviso, se voce já estiver conectado ao dispositivo, clique em sim`
    const passo1_3 = `Com o dispositivo ja conectado, coloque as credenciais de sua rede Wifi e clique em gravar, o dispositivo armazenara suas credenciais e se conectará a sua rede e em seguida irá retornar ao Home automaticamente`
    
    const titulo2 = "Vincular seu airtag"
    const passo2_1 = `Para cadastrar seu airtag, clique em Airtags, e clique em Deseja vincular um novo airtag`
    const passo2_2 = `Digite seu codigo MAC que veio junto com seu dispositivo, somente as letras e numeros`
    const passo2_3 = `Depois de digitado, clique no icone de +`
    const passo2_4 = `Com isso o seu Airtag ficara vinculado a sua conta`
   
    const titulo3 = "Listagem de seus airtags"
    const passo3_1 = `Clicando no menu lista, voce pode visualizar seus airtags cadastrados`
    const passo3_2 = `Clicando no icone de Lapis, voce pode digitar um nome de preferencia ao seu Airtag`
    const passo3_3 = `Clicando no icone de lixeira, essa ação ira deletar seu airtag`
    
    const titulo4 = "Localizando Airtag"
    const passo4_1 = `Clicando no menu Radar, voce pode visualizar seus airtags cadastrados`
    const passo4_2 = `Clicando no icone de seu airtag, ele comecara a soar o aviso sonoro para que voce possa localizar o dispositivo`
    const passo4_3 = `Quando Voltar a tela, o dispositivo ira desligar automatico`

    
    
  

    return(
        <View style={styles.container}>
            <Header title="Help" />
            <ScrollView style={styles.body}>
                <Text style={styles.txtTitle} >{titulo1}</Text>
                <Text style={styles.txtBody} >{passo1_1}</Text>
                <Text style={styles.txtBody} >{passo1_2}</Text>
                <Text style={styles.txtBody} >{passo1_3}</Text>


                <Text style={styles.txtTitle} >{titulo2}</Text>
                <Text style={styles.txtBody} >{passo2_1}</Text>
                <Text style={styles.txtBody} >{passo2_2}</Text>
                <Text style={styles.txtBody} >{passo2_3}</Text>
                <Text style={styles.txtBody} >{passo2_4}</Text>

                <Text style={styles.txtTitle} >{titulo3}</Text>
                <Text style={styles.txtBody} >{passo3_1}</Text>
                <Text style={styles.txtBody} >{passo3_2}</Text>
                <Text style={styles.txtBody} >{passo3_3}</Text>
                
                <Text style={styles.txtTitle} >{titulo4}</Text>
                <Text style={styles.txtBody} >{passo4_1}</Text>
                <Text style={styles.txtBody} >{passo4_2}</Text>
                <Text style={styles.txtBody} >{passo4_3}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    txtTitle:{
        marginVertical: 5,
        alignSelf: 'center',
        fontSize: 24
    },
    txtBody:{
        marginHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    body:{
        alignSelf: 'center',
    }
})