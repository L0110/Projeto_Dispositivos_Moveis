import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
};

const CronometroScreen = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [result, setResult] = useState<'vitória' | 'derrota' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const confettiY = useRef([...Array(12)].map(() => new Animated.Value(-50))).current;
  const navigation = useNavigation();

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
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running, startTime]);

  const start = () => {
    setShowStartButton(false);
    setStartTime(Date.now());
    setRunning(true);
  };

  const checkVictory = () => {
    const diff = Math.abs(elapsedTime - 10000);
    if (diff <= 30) {
      setResult('vitória');
      triggerConfetti();
    } else {
      setResult('derrota');
    }
    setShowModal(true);
  };

  const triggerConfetti = () => {
    confettiY.forEach((animatedValue, index) => {
      Animated.timing(animatedValue, {
        toValue: Dimensions.get('window').height,
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
    confettiY.forEach((val) => val.setValue(-50));
  };

  return (
    <View style={styles.container}>
      {showStartButton && (
        <TouchableOpacity style={styles.redButton} onPress={start} />
      )}

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
      </View>

      <TouchableOpacity style={styles.yellowButton} onPress={checkVictory} />

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.messageBox}>
            <Text
              style={[
                styles.resultText,
                { color: result === 'vitória' ? 'green' : 'red' },
              ]}
            >
              {result?.toUpperCase()}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={reset}>
              <Text style={styles.modalButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('Home' as never)}
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
  redButton: {
    position: 'absolute',
    top: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
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
  yellowButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'yellow',
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

export default CronometroScreen;
