/* Tela Home:
Tela principal do aplicativo:
- Botao Iniciar partida
- Botão Loja

- Botão Perfil
- Botão Saldo

# Histórico de jogos
# Exibe os jogos que o usuário ganhou
# Exibe os jogos que o usuário perdeu
*/
import {StatusBar} from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text,Image, View, TextInput,TouchableOpacity } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Text>Home</Text>
            <TouchableOpacity>
                <Text>Saldo</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Iniciar Partida</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Loja</Text>
            </TouchableOpacity>
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