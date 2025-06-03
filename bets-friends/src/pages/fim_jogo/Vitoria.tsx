import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DatabaseConnection } from '@/src/database/database-connection'; // Importe a conexão com o banco de dados

// Defina o tipo dos dados recebidos da API
type DadosResultado = {
  valorGanho: number;
  resultado: string;
  usuario: string;
  valorApostado: number;
};

export default function ResultadoJogo() {
  const logo2 = require('@/assets/images/logo/BF coin.png');
  const [dados, setDados] = useState<DadosResultado | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Importe o database do arquivo database-connection.tsx

  useEffect(() => {
    const fetchResultado = async () => {
      try {
        // Exemplo de consulta: ajuste o nome da tabela e os campos conforme seu banco
        const db = DatabaseConnection.getConnection();
        db.transaction(tx => {
          tx.executeSql(
            'SELECT valorGanho, resultado, usuario, valorApostado FROM resultados ORDER BY id DESC LIMIT 1',
            [],
            (_: any, results: any) => {
              if (results.rows.length > 0) {
                const row = results.rows.item(0);
                setDados({
                valorGanho: row.valorGanho,
                resultado: row.resultado,
                usuario: row.usuario,
                valorApostado: row.valorApostado,
              });
            } else {
              setDados(null);
            }
            setCarregando(false);
          },
          (_: any, error: Error) => {
            setDados(null);
            setCarregando(false);
            return false;
          }
          );
        });
        return;
      } catch (error) {
        console.error('Erro ao buscar resultado:', error);
        setDados(null);
        setDados(null);
      } finally {
        setCarregando(false);
      }
    };
    fetchResultado();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.loading}>
        <Text>Erro ao carregar dados.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.saldoText}>R$ {dados.valorGanho.toFixed(2)}</Text>
        <Ionicons name="person-circle-outline" size={28} color="#888" />
      </View>

      <Text style={styles.vitoria}>{dados.resultado}!</Text>
      <Text style={styles.jogador}>Jogador <Text style={styles.username}>#{dados.usuario}</Text></Text>
      <Text style={styles.valorGanho}>Valor apostado: R$ {dados.valorApostado.toFixed(2)}</Text>
      <Text style={styles.valorGanho}>Valor ganho: R$ {dados.valorGanho.toFixed(2)}</Text>

      <Image source={logo2} style={styles.logo}/>
      
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Repetir jogo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Início</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 50,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saldoText: {
    fontSize: 16,
    color: '#888',
    marginRight: 6,
  },
  vitoria: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 16,
  },
  jogador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  username: {
    color: '#000',
  },
  valorGanho: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  logo: {
    width: 120,
    height: 120,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  botao: {
    backgroundColor: '#f9ff63',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 18,
    fontWeight: '500',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});