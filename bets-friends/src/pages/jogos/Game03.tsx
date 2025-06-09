<<<<<<< HEAD
/*
Game quem aperta o botão primeiro
- Exige comunicacao entre dois jogadores
- Tela inicial com botão de iniciar o jogo
- Tela de jogo com botão que conta em quantos segundos o jogador apertou o botão
*/
=======
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DatabaseConnection } from '@/src/database/database-connection';
const db = DatabaseConnection.getConnection();

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
  // Removido: gameOver não é utilizado
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
    // Removido: setGameOver(false); não é necessário
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
    // Removido: setGameOver(true); não é necessário

    // Defina os valores conforme sua lógica
    const usuarioId = 1; // Substitua pelo ID real do usuário
    const oponenteId = 2; // Substitua pelo ID real do oponente
    const valorAposta = betAmount;
    const valorGanho = wordCompleted ? betAmount : 0;
    const valorPerdido = wordCompleted ? 0 : betAmount;
    const pontuacaoUsuario = wordCompleted ? player1Score + 1 : player1Score;
    const pontuacaoOponente = wordCompleted ? player2Score : player2Score + 1;

    salvarResultado(
      usuarioId,
      oponenteId,
      valorAposta,
      valorGanho,
      valorPerdido,
      pontuacaoUsuario,
      pontuacaoOponente
    );

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
      // Removido: opponent não é utilizado
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

  const salvarResultado = (
    usuarioId: number,
    oponenteId: number,
    valorAposta: number,
    valorGanho: number,
    valorPerdido: number,
    pontuacaoUsuario: number,
    pontuacaoOponente: number
  ): void => {
    // Use executeSql diretamente se transaction não existir em db
    db.transaction((tx: any) => {
      tx.executeSql(
        `INSERT INTO table_partida 
          (idUsuario, idOponente, valorAposta, valorGanho, valorPerdido, pontuacaoUsuario, pontuacaoOponente) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [usuarioId, oponenteId, valorAposta, valorGanho, valorPerdido, pontuacaoUsuario, pontuacaoOponente],
        () => {
          console.log('Resultado salvo com sucesso!');
        },
        (_: unknown, error: any) => {
          console.log('Erro ao salvar resultado:', error);
          return false;
        }
      );
    });
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
}

export default App;
>>>>>>> parent of c84e766 (Revert "Inclusao Game03")
