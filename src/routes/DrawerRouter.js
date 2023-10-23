import { StyleSheet } from 'react-native'
import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Lista_Tarefas from '../screens/toDo';

const Drawer = createDrawerNavigator()

export default function DrawerRouter() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="toDo">
            <Drawer.Screen name="Lista de Tarefas" component={Lista_Tarefas}/>
        </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})