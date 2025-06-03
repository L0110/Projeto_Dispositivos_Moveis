import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Tipos
type Word = {
  word: string;
  category: string;
};

type RPSChoice = 'pedra' | 'papel' | 'tesoura' | null;
type Winner = 'jogador' | 'oponente' | 'empate' | null;

const App = () => {
  const words: Word[] = [
    { word: "REACT", category: "Tecnologia" },
    { word: "JAVASCRIPT", category: "Programação" },
    { word: "NATIVO", category: "Mobile" },
    { word: "DESENVOLVIMENTO", category: "TI" },
    { word: "COMPONENTE", category: "React" },
    { word: "ESTADO", category: "Programação" },
    { word: "PROPS", category: "React" },
    { word: "HOOKS", category: "React" },
  ];

  const [currentWord, setCurrentWord] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [player1Coins, setPlayer1Coins] = useState<number>(100);
  const [player2Coins, setPlayer2Coins] = useState<number>(100);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [gameStage, setGameStage] = useState<'bet' | 'rps' | 'hangman'>('bet');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [rpsChoice, setRpsChoice] = useState<RPSChoice>(null);
  const [opponentChoice, setOpponentChoice] = useState<RPSChoice>(null);
  const [winner, setWinner] = useState<Winner>(null);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord.word);
    setCategory(randomWord.category);
    setGuessedLetters([]);
    setWrongAttempts(0);
    setGameStage('bet');
    setBetAmount(0);
    setRpsChoice(null);
    setOpponentChoice(null);
    setWinner(null);
    setGameOver(false);
    setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleBet = (amount: number) => {
    const playerCoins = currentPlayer === 1 ? player1Coins : player2Coins;

    if (amount > playerCoins) {
      Alert.alert("Aposta inválida", "Você não tem moedas suficientes!");
      return;
    }

    setBetAmount(amount);
    setGameStage('rps');
  };

  const handleRPSChoice = (choice: 'pedra' | 'papel' | 'tesoura') => {
    setRpsChoice(choice);

    const choices: RPSChoice[] = ['pedra', 'papel', 'tesoura'];
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    setOpponentChoice(randomChoice);

    const result = determineWinner(choice, randomChoice);
    setWinner(result);

    setTimeout(() => {
      setGameStage('hangman');
      if (result === 'jogador') {
        // Mantém o jogador atual
      } else if (result === 'oponente') {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
      // No caso de empate, não troca
    }, 2000);
  };

  const determineWinner = (playerChoice: RPSChoice, opponentChoice: RPSChoice): Winner => {
    if (playerChoice === opponentChoice) return 'empate';

    if (
      (playerChoice === 'pedra' && opponentChoice === 'tesoura') ||
      (playerChoice === 'papel' && opponentChoice === 'pedra') ||
      (playerChoice === 'tesoura' && opponentChoice === 'papel')
    ) {
      return 'jogador';
    }

    return 'oponente';
  };

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      Alert.alert("Letra já usada", "Tente outra letra!");
      return;
    }

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);

      if (currentPlayer === 1) {
        setPlayer1Coins(player1Coins - betAmount);
        setPlayer2Coins(player2Coins + betAmount);
      } else {
        setPlayer2Coins(player2Coins - betAmount);
        setPlayer1Coins(player1Coins + betAmount);
      }

      if (newAttempts >= 6) {
        endGame(false);
        return;
      }
    } else {
      const letterCount = currentWord.split(letter).length - 1;
      const reward = betAmount * letterCount;

      if (currentPlayer === 1) {
        setPlayer1Coins(player1Coins + reward);
        setPlayer2Coins(player2Coins - reward);
      } else {
        setPlayer2Coins(player2Coins + reward);
        setPlayer1Coins(player1Coins - reward);
      }

      if (checkWordCompleted(newGuessedLetters)) {
        endGame(true);
        return;
      }
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setGameStage('bet');
    setBetAmount(0);
    setRpsChoice(null);
    setOpponentChoice(null);
    setWinner(null);
  };

  const checkWordCompleted = (letters: string[]): boolean => {
    return currentWord.split('').every(letter => letters.includes(letter));
  };

  const endGame = (wordCompleted: boolean) => {
    setGameOver(true);

    if (wordCompleted) {
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }

      Alert.alert(
        "Vitória!",
        `Jogador ${currentPlayer} completou a palavra e ganhou a rodada!`,
        [{ text: "Jogar Novamente", onPress: startNewGame }]
      );
    } else {
      const opponent = currentPlayer === 1 ? 2 : 1;
      if (currentPlayer === 1) {
        setPlayer2Score(player2Score + 1);
      } else {
        setPlayer1Score(player1Score + 1);
      }

      Alert.alert(
        "Fim de Jogo",
        `A palavra era: ${currentWord}`,
        [{ text: "Jogar Novamente", onPress: startNewGame }]
      );
    }
  };

  const renderWord = () => {
    return currentWord.split('').map((letter, index) => (
      <View key={index} style={{ margin: 5 }}>
        <Text style={{ fontSize: 24 }}>
          {guessedLetters.includes(letter) ? letter : '_'}
        </Text>
      </View>
    ));
  };

  const renderAlphabet = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.map(letter => (
      <TouchableOpacity
        key={letter}
        onPress={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter)}
        style={{
          backgroundColor: guessedLetters.includes(letter) ? '#ccc' : '#3498db',
          padding: 10,
          margin: 2,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{letter}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
        Forca Duel
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>
        Jogador 1: {player1Score} pts ({player1Coins} moedas) | Jogador 2: {player2Score} pts ({player2Coins} moedas)
      </Text>

      {gameStage === 'bet' && (
        <View>
          <Text style={{ fontSize: 18 }}>Jogador {currentPlayer}, faça sua aposta</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            {[10, 20, 50].map(val => (
              <TouchableOpacity
                key={val}
                onPress={() => handleBet(val)}
                style={{ backgroundColor: '#2ecc71', padding: 15, borderRadius: 10 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gameStage === 'rps' && (
        <View>
          <Text style={{ fontSize: 18 }}>Pedra, Papel ou Tesoura</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            {['pedra', 'papel', 'tesoura'].map(val => (
              <TouchableOpacity
                key={val}
                onPress={() => handleRPSChoice(val as 'pedra' | 'papel' | 'tesoura')}
                style={{ backgroundColor: '#9b59b6', padding: 15, borderRadius: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {val === 'pedra' ? '✊' : val === 'papel' ? '✋' : '✌'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {rpsChoice && opponentChoice && (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text>Você: {rpsChoice}</Text>
              <Text>Oponente: {opponentChoice}</Text>
              <Text>
                {winner === 'empate'
                  ? 'Empate!'
                  : winner === 'jogador'
                  ? 'Você venceu!'
                  : 'Oponente venceu!'}
              </Text>
            </View>
          )}
        </View>
      )}

      {gameStage === 'hangman' && (
        <View>
          <Text style={{ fontSize: 18 }}>Jogador {currentPlayer}, escolha uma letra</Text>
          <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>Categoria: {category}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{renderWord()}</View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
            {renderAlphabet()}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  scoresContainer: {
    marginTop: 10,
  },
  playerScore: {
    fontSize: 16,
    color: '#34495e',
  },
  stageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  coinsText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#16a085',
  },
  betButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  betButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: 80,
    alignItems: 'center',
  },
  betButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  betConfirmation: {
    fontSize: 18,
    color: '#27ae60',
    fontWeight: 'bold',
    marginTop: 10,
  },
  rpsSubtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#7f8c8d',
  },
  rpsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  rpsButton: {
    backgroundColor: '#9b59b6',
    padding: 20,
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rpsButtonText: {
    fontSize: 30,
  },
  rpsResults: {
    marginTop: 20,
    alignItems: 'center',
  },
  rpsChoice: {
    fontSize: 18,
    marginBottom: 5,
  },
  rpsWinner: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 10,
  },
  categoryText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#16a085',
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  letterContainer: {
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#2c3e50',
    width: 30,
    alignItems: 'center',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  hangmanContainer: {
    width: 200,
    height: 250,
    marginBottom: 30,
    position: 'relative',
  },
  hangmanBase: {
    position: 'absolute',
    bottom: 0,
    left: 50,
    width: 100,
    height: 10,
    backgroundColor: '#2c3e50',
  },
  hangmanPole: {
    position: 'absolute',
    bottom: 0,
    left: 80,
    width: 10,
    height: 200,
    backgroundColor: '#2c3e50',
  },
  hangmanTop: {
    position: 'absolute',
    top: 0,
    left: 80,
    width: 80,
    height: 10,
    backgroundColor: '#2c3e50',
  },
  hangmanRope: {
    position: 'absolute',
    top: 10,
    left: 160,
    width: 2,
    height: 30,
    backgroundColor: '#2c3e50',
  },
  hangmanHead: {
    position: 'absolute',
    top: 40,
    left: 150,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2c3e50',
  },
  hangmanBody: {
    position: 'absolute',
    top: 70,
    left: 162,
    width: 6,
    height: 60,
    backgroundColor: '#2c3e50',
  },
  hangmanLeftArm: {
    position: 'absolute',
    top: 80,
    left: 142,
    width: 20,
    height: 6,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '-30deg' }],
  },
  hangmanRightArm: {
    position: 'absolute',
    top: 80,
    left: 168,
    width: 20,
    height: 6,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '30deg' }],
  },
  hangmanLeftLeg: {
    position: 'absolute',
    top: 130,
    left: 142,
    width: 20,
    height: 6,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '-30deg' }],
  },
  hangmanRightLeg: {
    position: 'absolute',
    top: 130,
    left: 168,
    width: 20,
    height: 6,
    backgroundColor: '#2c3e50',
    transform: [{ rotate: '30deg' }],
  },
  alphabetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  letterButton: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: '#3498db',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usedLetter: {
    backgroundColor: '#bdc3c7',
  },
  letterButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newGameButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
