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
    
    
    import Arvore from '@/src/pages/Arvore_classificacao';
    import Configuracoes from '@/src/pages/Configuracoes';
    import Home from '@/src/pages/Home';
    import Login from '@/src/pages/Login';
    import Nova_conta from '@/src/pages/Nova_conta';
    import Perfil from '@/src/pages/Perfil';
    import Ranking from '@/src/pages/Ranking';
    import Selecao_jogos from '@/src/pages/Selecao_jogos';
    import Carteira from '@/src/Pages/loja/Carteira';
    import Loja from '@/src/pages/loja/Loja';
    import Game01 from '@/src/pages/jogos/Game01';
    import Game02 from '@/src/pages/jogos/Game02';
    import Game03 from '@/src/pages/jogos/Game03';
    import Game04 from '@/src/pages/jogos/Game04';
    import Derrota from '@/src/pages/fim_jogo/Derrota';
    import Vitoria from '@/src/pages/fim_jogo/Vitoria';
    import Empate from '@/src/pages/fim_jogo/Empate';
    
    

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
    /*<Stack.Screen name="Home" component={Home} />*/
    
      <Stack.Navigator>
        <Stack.Screen name="Game01" component={Game01} />
      </Stack.Navigator>
  

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
