import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal, Dimensions, } from 'react-native';

const { width, height } = Dimensions.get('window');

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
};

type Props = {
  navigation: any;
};

const Game02: React.FC<Props> = ({ navigation }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [result, setResult] = useState<'vitória' | 'derrota' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showTimeDisplay, setShowTimeDisplay] = useState(true);
  const [showBalloon, setShowBalloon] = useState(false);
  const [clickedTime, setClickedTime] = useState(0);

  const confettiY = useRef([...Array(12)].map(() => new Animated.Value(-50))).current;
  const resetConfetti = () => {
    confettiY.forEach((val) => val.setValue(-50));
  };

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        const now = Date.now();
        if (startTime) {
          const newElapsed = now - startTime;
          if (newElapsed >= 60000) {
            clearInterval(interval);
            setElapsedTime(60000);
            setRunning(false);
          } else {
            setElapsedTime(newElapsed);
          }

          // Oculta o cronômetro após 4 segundos
          if (newElapsed >= 4000 && showTimeDisplay) {
            setShowTimeDisplay(false);
          }
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running, startTime, showTimeDisplay]);

  const start = () => {
    setShowStartButton(false);
    setStartTime(Date.now());
    setRunning(true);
    setShowTimeDisplay(true);
  };

  const checkVictory = () => {
    const diff = Math.abs(elapsedTime - 10000);
    const clickedSec = elapsedTime / 1000;
    setClickedTime(clickedSec);
    setShowBalloon(true);

    if (diff <= 30) {
      setResult('vitória');
      triggerConfetti();
    } else {
      setResult('derrota');
    }
    setShowModal(true);
  };

  const triggerConfetti = () => {
    resetConfetti(); // reinicia as posições antes de animar
    confettiY.forEach((animatedValue, index) => {
      Animated.timing(animatedValue, {
        toValue: height,
        duration: 2000 + index * 100,
        useNativeDriver: true,
      }).start();
    });
  };

  const reset = () => {
    setElapsedTime(0);
    setStartTime(null);
    setRunning(false);
    setShowStartButton(true);
    setShowModal(false);
    setResult(null);
    setShowTimeDisplay(true);
    setShowBalloon(false);
    confettiY.forEach((val) => val.setValue(-50));
  };

  return (
    <View style={styles.container}>

      {showStartButton && (
        <TouchableOpacity style={styles.redButton} onPress={start}>
          <Text style={styles.textRebButton}>Iniciar</Text>
        </TouchableOpacity>

      )}

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>
          {showTimeDisplay ? formatTime(elapsedTime) : '--:--:--'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.yellowButton,
          { opacity: showStartButton ? 0.5 : 1 },
        ]}
        onPress={checkVictory}
        disabled={showStartButton}
      >
        <Text style={styles.textYellowButton}>PARE</Text>
      </TouchableOpacity>

      {showBalloon && (
        <View style={styles.balloon}>
          <Text style={styles.balloonText}>
            Pressionado em {clickedTime.toFixed(2)}s
          </Text>
        </View>
      )}

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.messageBox}>
            {result && (
              <TouchableOpacity
                onPress={() => {
                  if (result === 'vitória') {
                    triggerConfetti();
                  }
                }}
              >
                <Text
                  style={[
                    styles.resultText,
                    { color: result === 'vitória' ? 'green' : 'red' },
                  ]}
                >
                  {result.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={reset}>
              <Text style={styles.modalButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.modalButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {result === 'vitória' &&
        confettiY.map((y, i) => (
          <Animated.View
            key={i}
            style={[
              styles.confetti,
              {
                transform: [{ translateY: y }],
                left: Math.random() * width,
                backgroundColor: getRandomColor(),
              },
            ]}
          />
        ))}
    </View>
  );
};

const getRandomColor = () =>
  ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][
  Math.floor(Math.random() * 5)
  ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRebButton: {
    position: 'relative',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  redButton: {
    position: 'absolute',
    top: 60,
    width: 50,
    height: 50,
    borderRadius: 100,
    paddingVertical: 15,
    backgroundColor: 'red',
  },
  timerBox: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  timerText: {
    fontSize: 32,
    color: 'white',
    fontVariant: ['tabular-nums'],
  },
  textYellowButton: {
    position: 'relative',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 25,
  },
  yellowButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'yellow',
  },
  balloon: {
    position: 'absolute',
    top: 120,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    zIndex: 10,
  },
  balloonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});

export default Game02;
