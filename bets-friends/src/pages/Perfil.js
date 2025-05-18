/* Tela perfil:
Formulario para alteração de dados cadastrados:
- Nome
- Sobrenome
- CPF
- Nascimento
- E-mail
- Senha
*/
import {StatusBar} from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text,Image, View, TextInput,TouchableOpacity } from 'react-native';

export default function Perfil() {

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Text>Perfil</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})