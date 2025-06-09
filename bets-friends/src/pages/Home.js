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
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ navigation }) => {
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
            <TouchableOpacity onPress={() => navigation.navigate('Game01')}>
                <Text>Iniciar Partida</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Loja')}>
                <Text>Loja</Text>
            </TouchableOpacity>
        </View>
    );
}
  
export default Home;    
  
const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
      },
      button: {
          backgroundColor: '#007BFF',
          padding: 15,
          borderRadius: 5,
          marginVertical: 10,
      },
      buttonText: {
          color: '#fff',
          fontSize: 18,
      },
  });
