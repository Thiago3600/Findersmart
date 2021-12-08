//Requerimentos necessário
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

//Importação das telas
import Login from "./screen/Login";
import ForgetPass from "./screen/ForgetPass";
import alterPass from "./screen/alterPass";
import CodVerify from "./screen/CodVerify";
import LoginWifi from "./screen/LoginWifi";
import CadUser from "./screen/CadUser";
import Home from "./screen/Home";
import Airtags from "./screen/AirTags";
import cadastro from "./screen/cadastro";
import Radar from "./screen/Radar";
import Help from "./screen/Help";

const optionsScreen = {
    headerShown: false
}

const {Navigator, Screen} = createStackNavigator()

//Navegação entre telas
const AppNavigator = () => {
    return (
    <NavigationContainer>
        <Navigator screenOptions={optionsScreen} initialRouteName="Login">
            <Screen name="Login" component={Login} />
            <Screen name="ForgetPass" component={ForgetPass} />
            <Screen name="alterPass" component={alterPass} />
            <Screen name="CodVerify" component={CodVerify} />
            <Screen name="LoginWifi" component={LoginWifi} />
            <Screen name="CadUser" component={CadUser} />
            <Screen name="Home" component={Home} />
            <Screen name="cadastro" component={cadastro} />
            <Screen name="Airtags" component={Airtags} />
            <Screen name="Radar" component={Radar} />
            <Screen name="Help" component={Help} />
        </Navigator>
    </NavigationContainer>
    )
}

export default AppNavigator