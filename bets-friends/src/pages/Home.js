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

<<<<<<< HEAD
// Importando o banco de dados

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
            <TouchableOpacity>
                <Text>Iniciar Partida</Text>
            </TouchableOpacity>
            <TouchableOpacity>
      ;          <Text>Loja</Text>
            </TouchableOpacity>
        </View>
    );
=======
export default function Home({ navigation }) {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_usuario'",
        [],
        function (tx, res) {
         if (res.rows.length === 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_usuario (idUsuario INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, sobrenome TEXT NOT NULL, email TEXT UNIQUE NOT NULL, telefone TEXT, cpf TEXT UNIQUE, dataNascimento DATE, saldoCarteira REAL DEFAULT 0.00)'
            );
            console.log('Tabela 01 de 04 criada com sucesso');
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_loja (idProduto INTEGER PRIMARY KEY AUTOINCREMENT, nomeProduto TEXT NOT NULL, valorProduto REAL NOT NULL)'
            );
            console.log('Tabela 02 de 04 criada com sucesso');
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_partida (idPartida INTEGER PRIMARY KEY AUTOINCREMENT, idUsuario INTEGER NOT NULL, idOponente INTEGER NOT NULL, valorAposta REAL DEFAULT 0.00, valorGanho REAL DEFAULT 0.00, valorPerdido REAL DEFAULT 0.00, pontuacaoUsuario INTEGER DEFAULT 0, pontuacaoOponente INTEGER DEFAULT 0, dataPartida DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (idUsuario) REFERENCES table_usuario(idUsuario), FOREIGN KEY (idOponente) REFERENCES table_usuario(idUsuario))'
            );
            console.log('Tabela 03 de 04 criada com sucesso');
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_pontuacao (idPontuacao INTEGER PRIMARY KEY AUTOINCREMENT, idUsuario INTEGER NOT NULL, pontuacao INTEGER DEFAULT 0, dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (idUsuario) REFERENCES table_usuario(idUsuario))'
            );
            console.log('Tabela 01 de 04 criada com sucesso');
            console.log('🆗 Tabelas criadas com sucesso');
          }
        }
      );
    });
  }, []); 
>>>>>>> parent of c84e766 (Revert "Inclusao Game03")

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Partida')}>
        <Text style={styles.buttonText}>Iniciar Partida</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Loja')}>
        <Text style={styles.buttonText}>Loja</Text>
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