/*
Jogo de quem aperta mais vezes o botão em 10 segundos
- Tela inicial com botão de iniciar o jogo
- Tela de jogo com botão que conta quantas vezes foi apertado
- Tela de resultado com o número de vezes que o botão foi apertado
- Tela de ranking com os melhores resultados
- Tela de configurações com opções de som, notificações e tema
*/

import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



export default function Game01() {
  const [timeLeft, setTimeLeft] = useState(10);//Estado para controlar o tempo restante do jogo
  const [player1Count, setPlayer1Count] = useState(0);//Estado para armazenar a contagem de cliques
  const [player2Count, setPlayer2Count] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);//Estado booleano para saber se o jogo esta em andamento
  const [showButton, setShowButton] = useState(true);//Estado booleano para controlar a visibilidade do botao "começar"
  const [hiderPlayer1, setHidePlayer1] = useState(false);
  const [hiderPlayer2, setHidePlayer2] = useState(false);
  const intervalRef = useRef<number | null>(null);//Referencia para armazenar o interfalo do time(setInterval)
  const [selectedPlayer, setSelectedPlayer] = useState<null | 1 | 2>(null);//null,1 ou 2

  const startGame = () => {
    //reinicia os pontos dos jogadores
    setPlayer1Count(0);
    setPlayer2Count(0);
    if (!selectedPlayer) {
      Alert.alert('Atenção', 'Você precisa escolher um jogador antes de começar!');
      return;
    }


    setTimeLeft(10);//Reinicia o tempo para 10s
    setShowButton(false);//Esconde o botao
    setIsPlaying(true);//informar que o jogo começou

    intervalRef.current = setInterval(() => {//A funcao setInterval executa o bloco de codigo a cada 1000 milissegundos(1 segundo)
      setTimeLeft((prev) => { //Atualiza o estado timeLeft usando o valor anterior(prev)
        if (prev === 1) { //Se faltar apenas 1s
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);//Para o intervalo(para de executar o setInterval)
          }
          setIsPlaying(false);//Informar que o jogo terminou(estado para gerar o jogo)
          setShowButton(true);//Mostra o botao apos 10s
          setHidePlayer1(false);
          setHidePlayer2(false);
          Alert.alert("Tempo esgotado!", getWinner());


          return 0;//retornar o valor final do tempo
        }
        return prev - 1;//Caso contrario,reduz o tempo restante em 1s
      });
    }, 1000);//O intervalo é executado a cada 1000 milissegundos(1s)
  };

  const getWinner = () => {//Funcao que decide quem venceu o jogo com base nas ccontagens dos jogadores

    //Se o jogador e ou 2 tiver mais toque,ele vence
    if (player1Count > player2Count) return 'Jogador 1 venceu!';
    if (player2Count > player1Count) return 'Jogador 2 venceu!';
    return 'Empate!';//Se os dois tiverem o mesmo numero de toque,da empate
  };

  return (
    //container principal da tela
    <View style={styles.container}>
      <Text style={styles.timerText}>Tempo restante: {timeLeft}s</Text>
      <View style={styles.playersContainer}>

        {!hiderPlayer1 && (
          <TouchableOpacity
            disabled={isPlaying && selectedPlayer !== 1}
            style={styles.playerButton1}
            onPress={() => {
              if (!isPlaying) {
                setSelectedPlayer(1);//Esolhe o jogador1
                setHidePlayer2(true);//esconde o jogador 2 na hora da escolha
                Alert.alert('Você escolheu o jogador 1');
              } else {
                setPlayer1Count(player1Count + 1);
                setHidePlayer2(true);//esconde o jogador2
              }
            }}
          >
            <Text style={styles.playerText}>Jogador 1: {player1Count}</Text>
          </TouchableOpacity>
        )}
        {!hiderPlayer2 && (
          <TouchableOpacity
            disabled={isPlaying && selectedPlayer !== 2}
            style={styles.playerButton2}
            onPress={() => {
              if (!isPlaying) {
                setSelectedPlayer(2);//escolhe o jogador1
                setHidePlayer1(true);//esconde o jogador 1na hora da escolha
                Alert.alert('Você escolheu o jogador 2');
              } else {
                setPlayer2Count(player2Count + 1);
                setHidePlayer1(true);//esconde o play1
              }
            }}
          >
            <Text style={styles.playerText}>Jogador 2: {player2Count}</Text>
          </TouchableOpacity>
        )}

      </View>

      {showButton && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Começar</Text>
        </TouchableOpacity>
      )}

      {!isPlaying && timeLeft === 0 && (
        <Text style={styles.winnerText}>{getWinner()}</Text>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,//Ocupa todo o espaco disponivel na tela
    backgroundColor: '#101010',//cor de fundo
    alignItems: 'center',//centraliza os itens horizontalmente
    justifyContent: 'center',//centraliza os items verticamente
    padding: 20,//Espaçamento interno nas bordas do caontainer
  },
  timerText: {
    fontSize: 24,//tamanho da fonte do texto do tempo
    color: '#fff',
    marginBottom: 20,//espaco a baixo do texto
  },
  startButton: {
    backgroundColor: '#ffef00',
    padding: 40,
    borderRadius: 30,//bordar arrendodada
    marginTop: 90,//Empurra para baixo
    textAlign: 'center',




  },
  startButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',

  },
  playersContainer: {
    flexDirection: 'row',//Organiza os botoes dos jogadores lado a lado
    justifyContent: 'space-around',//espaco igual entre os botoes
    width: '100%',//ocupa toda a largura da tela

  },
  playerButton1: {
    backgroundColor: '#8b0000',//
    padding: 30,
    borderRadius: 10,
    marginHorizontal: 10,//espaco entre os botoes
    width: '40%',
  },
  playerButton2: {
    backgroundColor: '#191970',
    padding: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    width: '40%',

  },
  playerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  winnerText: {
    fontSize: 28,
    color: '#FFD700',
    marginTop: 30,//espaco acima do texto
    textAlign: 'center',//centraliza o texto
  },
});