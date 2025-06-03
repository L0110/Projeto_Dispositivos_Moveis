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

import { DatabaseConnection } from '../database/database-connection';
const db = DatabaseConnection.getConnection();

// Importando o banco de dados

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_multa'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_multa', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_multa(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_multa VARCHAR(100),user_contact VARCHAR(100), user_INFRACAO VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

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