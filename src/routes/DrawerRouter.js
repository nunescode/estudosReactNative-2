import 'react-native-gesture-handler';
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackPessoas from '../screens/Pessoas/StackPessoas';
import FormPessoa from '../screens/Pessoas/FormPessoa';
import ListaPessoas from '../screens/Pessoas/ListaPessoas';

const Drawer = createDrawerNavigator()

export default function DrawerRouter() {
  return (
    <Drawer.Navigator initialRouteName='Cadastro'>
    <Drawer.Screen name="Lista de Pessoas" component={StackPessoas} />
    </Drawer.Navigator>
  )
}
