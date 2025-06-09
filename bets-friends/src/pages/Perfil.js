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
import React from 'react';
import { StyleSheet, Text,Image, View, TextInput,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

export default function Perfil() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Text style={styles.titulo}>Perfil</Text>
            <Image source={require('@/assets/images/avatar/Luigi_que_viu_coisas.jpg')} style={{width: 100, height: 100}} />
            <TextInput
                style={styles.input}
                placeholder="Nome"  
            />
            <TextInput
                style={styles.input}
                placeholder="Sobrenome"
            />
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                format="999.999.999-99"
                placeholder="CPF"
            />
            <TextInputMask
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                style={styles.input}
                keyboardType='numeric'
                placeholder="Data de Nascimento"
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Excluir Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Voltar</Text>
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        width: '80%',
        paddingHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})