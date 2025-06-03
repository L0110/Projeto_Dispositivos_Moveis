import {StatusBar} from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,Image, View, TextInput,TouchableOpacity } from 'react-native';
import { db } from '@/src/database/database-connection'; // Importe seu objeto de banco de dados aqui


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const logo2 = require('@/assets/images/logo/BF coin.png');
  const email1=require('@/assets/images/icones/E-mail.png');
  const senha1=require('@/assets/images/icones/cadeado.png');
  const google = require('@/assets/images/logo/google-96.png');
  const meta = require('@/assets/images/logo/meta-96.png');
  
    validarLogin = ({navigation}) => {
      if (email === 'teste@teste.com' && senha === 'teste123'){
        navigation.navigate('Home')
      }
      else{
        alert('E-mail ou senha inválidos');
      }
    }
  

  const entrar = () =>{
   
   alert(email);
   alert(senha);
   //Fazer chamada no back end para cadastro
  };

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
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_loja (idProduto INTEGER PRIMARY KEY AUTOINCREMENT, nomeProduto TEXT NOT NULL, valorProduto REAL NOT NULL)'
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_partida (idPartida INTEGER PRIMARY KEY AUTOINCREMENT, idUsuario INTEGER NOT NULL, idOponente INTEGER NOT NULL, valorAposta REAL DEFAULT 0.00, valorGanho REAL DEFAULT 0.00, valorPerdido REAL DEFAULT 0.00, pontuacaoUsuario INTEGER DEFAULT 0, pontuacaoOponente INTEGER DEFAULT 0, dataPartida DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (idUsuario) REFERENCES table_usuario(idUsuario), FOREIGN KEY (idOponente) REFERENCES table_usuario(idUsuario))'
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_pontuacao (idPontuacao INTEGER PRIMARY KEY AUTOINCREMENT, idUsuario INTEGER NOT NULL, pontuacao INTEGER DEFAULT 0, dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (idUsuario) REFERENCES table_usuario(idUsuario))'
            );
            console.log('🆗 Tabelas criadas com sucesso');
          }
        }
      );
    });
  }, []);

  return(

   

    <View style={styles.container}>
    <View style={styles.logoContainer}>
    
    <StatusBar hidden/>

    <View style={styles.header}>
    <Image source={logo2} style ={styles.logo2}/>
    <Text style={styles.textoLogo}>Bets Friends</Text>
    </View>

   

   <View style={styles.inputContainer}>
   <Image source={email1} style={styles.email1}/>
    <TextInput placeholder ="E-mail"style={styles.textInput}onChangeText={text=>setEmail(text)}
     />
     </View>
  
    
   <View style={styles.inputContainer}>
   <Image source={senha1} style={styles.senha1}/>
    <TextInput secureTextEntry={true}placeholder =" Senha.."style={styles.textInput}onChangeText={text=>setSenha(text)}
     />
    </View>

    <TouchableOpacity onPress={entrar} style={styles.btnEntrar}>
    <Text style={styles.textoBotao}>Entrar</Text>
    </TouchableOpacity>

    <View style={styles.googleContainer}>
      <Text style={styles.textoEsqueci}>Esqueceu a senha? Entre com</Text> 
      </View>



      <View style={styles.imageContainer}>
      <Image source={google} style={styles.google}/>
      <Image source={meta} style={styles.meta}/>
      </View>

      <View style={styles.termosContainer}>
      
      <Text style={styles.textotermo}>Ao entrar ,você concordar com os termos de uso e os termos de privacidade
      </Text>
      </View>

       
    

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:30,
    alignItems:'center',
    justifyContent:'center',
   // transform: [{ scale: 0.8 }]
    
    

      },
      header:{
        alignItems:'center',
        padding:10,
       
        
  
      
        

      },
      senha1:{
        width:40,
        height:40,
       
      },
      imageContainer:{
        width:90,
        height:90,
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    


      },
      termosContainer:{
       
        alignItems:'center',
        flexDirection:'row',
        gap:10,
        flex:0.9,
      
        
        
        
        
        
      },
   
      
      email1:{
        width:40,
        height:40,
        alignContent:'center',
        alignItems:'center',
      },  
       inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        marginBottom:17,
        height:50,
        width:'100%',
      },
      googleContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      },
  textInput:{
    flex:1,
    fontSize:16,
    color:'#000',
    borderRadius:20,
    width:'100%',
    backgroundColor:'#dcdcdc',
    paddingLeft:10,
    marginBottom:10,
    height:50,
    
    
 
   
  },
  btnEntrar:{
    width:'100%',
    height:50,
    backgroundColor:'white',
    borderRadius:0,
    justifyContent:'center',
    textAlign:'center',

    
    
  },
  textoBotao:{
    color:'black',
    fontSize:15,
    fontWeight:'bold',
    backgroundColor:'#ffef00',
    borderRadius:20,
    height:35,
    textAlign:'center',
    alignContent:'center',
    

  },
  logo2:{
    width:200,
    height:100,
    resizeMode:'contain',
    alignItems:'center',
  },
  textoLogo:{
    fontSize:30,
    fontWeight:'bold',
    color:'#ffd700',
    textAlign:'center',
    marginBottom:100,
    alignItems:'center',
    borderRadius:100,
  
  },

 
  textoEsqueci:{
    marginTop:10,
    justifyContent:'center',
    fontSize:14,
    flexDirection:'row',
    alignItems:'center',
    gap:6,

  }



});