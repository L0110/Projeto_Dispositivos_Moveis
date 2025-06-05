/*
Jogo de quem aperta mais vezes o botão em 10 segundos
- Tela inicial com botão de iniciar o jogo
- Tela de jogo com botão que conta quantas vezes foi apertado
- Tela de resultado com o número de vezes que o botão foi apertado
- Tela de ranking com os melhores resultados
- Tela de configurações com opções de som, notificações e tema
*/
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH * 0.45;

// Tipos auxiliares
type Player = 1 | 2 | null;
type GameResult = string | null;

export default function App(): JSX.Element {
  // Estados do jogo
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [player1Count, setPlayer1Count] = useState<number>(0);
  const [player2Count, setPlayer2Count] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(null);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [player1Wins, setPlayer1Wins] = useState<number>(0);
  const [player2Wins, setPlayer2Wins] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(true);
  
  // Animações
  const player1Position = useRef<Animated.Value>(new Animated.Value(0)).current;
  const player2Position = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Referências
  const intervalRef = useRef<number | null>(null);
  const gameEndedRef = useRef<boolean>(false);
  const player1CountRef = useRef<number>(0);
  const player2CountRef = useRef<number>(0);

  // Limpar intervalo ao desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleGoBack = (): void => {
    Alert.alert('Voltar', 'Deseja realmente sair do jogo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => console.log('Sair do jogo') }
    ]);
  };

  const animatePlayerPosition = (player: Player, toValue: number): void => {
    const positionAnim = player === 1 ? player1Position : player2Position;
    
    Animated.timing(positionAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true
    }).start();
  };

  const startNewGame = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setPlayer1Count(0);
    setPlayer2Count(0);
    player1CountRef.current = 0;
    player2CountRef.current = 0;
    setTimeLeft(10);
    setGameResult(null);
    setSelectedPlayer(null);
    setIsPlaying(false);
    gameEndedRef.current = false;
    setShowButton(true);

    animatePlayerPosition(1, 0);
    animatePlayerPosition(2, 0);
  };

  const startMatch = (): void => {
    if (!selectedPlayer) {
      Alert.alert('Atenção', 'Selecione um jogador primeiro!');
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setPlayer1Count(0);
    setPlayer2Count(0);
    player1CountRef.current = 0;
    player2CountRef.current = 0;
    setTimeLeft(10);
    setGameResult(null);
    setIsPlaying(true);
    gameEndedRef.current = false;
    setShowButton(false);

    if (selectedPlayer === 1) {
      animatePlayerPosition(1, 1);
      animatePlayerPosition(2, -1);
    } else {
      animatePlayerPosition(2, 1);
      animatePlayerPosition(1, -1);
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = (): void => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;

    setIsPlaying(false);
    setShowButton(true);
    
    animatePlayerPosition(1, 0);
    animatePlayerPosition(2, 0);

    setTimeLeft(10);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let result = '';
    if (player1CountRef.current > player2CountRef.current) {
      result = 'Jogador 1 venceu!';
      setPlayer1Wins(prev => prev + 1);
    } else if (player2CountRef.current > player1CountRef.current) {
      result = 'Jogador 2 venceu!';
      setPlayer2Wins(prev => prev + 1);
    } else {
      result = 'Empate!';
    }

    setGameResult(result);

    setTimeout(() => {
      Alert.alert('Fim de jogo!', result);
    }, 100);
  };

  const handlePlayerSelect = (player: Player): void => {
    if (isPlaying) return;
    setSelectedPlayer(player);
    Alert.alert(`Jogador ${player} selecionado`, 'Clique em Iniciar para começar!');
  };

  const handlePlayerClick = (player: Player): void => {
    if (!isPlaying || selectedPlayer !== player) return;

    if (player === 1) {
      setPlayer1Count(prev => {
        const updated = prev + 1;
        player1CountRef.current = updated;
        return updated;
      });
    } else if (player === 2) {
      setPlayer2Count(prev => {
        const updated = prev + 1;
        player2CountRef.current = updated;
        return updated;
      });
    }
  };

  const player1Style = {
    transform: [
      {
        translateX: player1Position.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-SCREEN_WIDTH * 0.3, 0, (SCREEN_WIDTH / 2 - BUTTON_WIDTH / 2)]
        })
      }
    ]
  };

  const player2Style = {
    transform: [
      {
        translateX: player2Position.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [SCREEN_WIDTH * 0.3, 0, -(SCREEN_WIDTH / 2 - BUTTON_WIDTH / 2)]
        })
      }
    ]
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back" size={30} color="#2c3e50" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Jogo do Clique</Text>
      </View>

      <View style={styles.totalScoreContainer}>
        <Text style={styles.totalScoreText}>Vitórias: J1 {player1Wins} x {player2Wins} J2</Text>
      </View>

      <Text style={styles.timerText}>Tempo: {timeLeft}s</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Jogador 1: {player1Count}</Text>
        <Text style={styles.scoreText}>Jogador 2: {player2Count}</Text>
      </View>

      <View style={styles.playersContainer}>
        <Animated.View style={[styles.player1Wrapper, player1Style]}>
          <TouchableOpacity
            disabled={isPlaying && selectedPlayer !== 1}
            style={[
              styles.playerButton,
              styles.player1Button,
              selectedPlayer === 1 && styles.selectedPlayer,
              isPlaying && selectedPlayer !== 1 && styles.disabledPlayer
            ]}
            onPress={() => {
              if (!isPlaying) {
                handlePlayerSelect(1);
              } else {
                handlePlayerClick(1);
              }
            }}
          >
            <Text style={styles.playerText}>Jogador 1</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.player2Wrapper, player2Style]}>
          <TouchableOpacity
            disabled={isPlaying && selectedPlayer !== 2}
            style={[
              styles.playerButton,
              styles.player2Button,
              selectedPlayer === 2 && styles.selectedPlayer,
              isPlaying && selectedPlayer !== 2 && styles.disabledPlayer
            ]}
            onPress={() => {
              if (!isPlaying) {
                handlePlayerSelect(2);
              } else {
                handlePlayerClick(2);
              }
            }}
          >
            <Text style={styles.playerText}>Jogador 2</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {showButton ? (
        <TouchableOpacity
          style={styles.controlButton}
          onPress={selectedPlayer ? startMatch : startNewGame}
        >
          <Text style={styles.controlButtonText}>
            {selectedPlayer ? 'Iniciar Partida' : 'Novo Jogo'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.controlButton, styles.stopButton]}
          onPress={endGame}
        >
          <Text style={styles.controlButtonText}>Parar</Text>
        </TouchableOpacity>
      )}

      {gameResult && (
        <Text style={styles.resultText}>{gameResult}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbfdf4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 150,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  titleContainer: {
    position: 'absolute',
    top: 80,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  totalScoreContainer: {
    marginBottom: 10,
  },
  totalScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#2c3e50',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  player1Wrapper: {
    width: '45%',
    alignItems: 'flex-start',
  },
  player2Wrapper: {
    width: '45%',
    alignItems: 'flex-end',
  },
  playerButton: {
    width: '100%',
    height: 80,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  player1Button: {
     width:170,
    height:100,
    backgroundColor: '#e74c3c',
  },
  player2Button: {
    width:170,
    height:100,
    backgroundColor: '#3498db',
  },
  selectedPlayer: {
    borderWidth: 5,
    borderColor: '#f1c40f',
    transform: [{ scale: 1.05 }],
  },
  disabledPlayer: {
    opacity: 0.5,
  },
  playerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  controlButton: {
    backgroundColor: '#ffef00',
    borderRadius: 70,
    marginTop: 130,
    width: 150,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    backgroundColor: '#e73c3c',
  },
  controlButtonText: {
    color: '#002a3e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#27ae60',
  },
});