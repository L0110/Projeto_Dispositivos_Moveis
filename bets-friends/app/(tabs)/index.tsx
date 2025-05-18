/*
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

*/


/*export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <Login />
    </ScrollView>
    </SafeAreaView>
    );
    }*/
    import 'react-native-gesture-handler';
     
    import * as React from 'react';
     
    import { NavigationContainer } from '@react-navigation/native';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
    import { createDrawerNavigator } from '@react-navigation/drawer';
    import { createStackNavigator } from '@react-navigation/stack';
    import { Card } from 'react-native-paper';
    import { View,SafeAreaView , Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
    import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
    import { useFonts } from 'expo-font';
    import { StatusBar } from 'expo-status-bar';
    import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
    import { useColorScheme } from '@/hooks/useColorScheme';
    import { Image } from 'expo-image';
    
    
    import Arvore from '@/src/Pages/Arvore_classificacao';
    import Configuracoes from '@/src/Pages/Configuracoes';
    import inicio from '@/src/Pages/Home';
    import Login from '@/src/pages/Login';
    import Nova_conta from '@/src/Pages/Nova_conta';
    import Perfil from '@/src/Pages/Perfil';
    import Ranking from '@/src/Pages/Ranking';
    import Selecao_jogos from '@/src/Pages/Selecao_jogos';
    import Carteira from '@/src/Pages/loja/Carteira';
    import Loja from '@/src/Pages/loja/Loja';
    import Game01 from '@/src/Pages/jogos/Game01';
    import Game02 from '@/src/Pages/jogos/Game02';
    import Game03 from '@/src/Pages/jogos/Game03';
    import Game04 from '@/src/Pages/jogos/Game04';
    import Derrota from '@/src/Pages/fim_jogo/Derrota';
    import Vitoria from '@/src/Pages/fim_jogo/Vitoria';
    import Empate from '@/src/Pages/fim_jogo/Empate';
    
    

/*
cor 01: #F3F4F0 (tela principal)
cor 02: #8A919B (marcadores/seletores)
cor 03: #F0FF69 (botão area escura)
cor 04: #776C5B (botão) area clara)
cor 05: #27262D (apoio/contraste)
*/

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Inicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
