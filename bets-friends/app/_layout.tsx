import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Login from '@/src/pages/Login';


export function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Tabs>
        <Tabs.Screen name="Login" options={{ title: 'Login' }} />
        <Tabs.Screen name="Home" options={{ title: 'Home' }} />
        <Tabs.Screen name="Jogos" options={{ title: 'Jogos' }} />
        <Tabs.Screen name="Loja" options={{ title: 'Loja' }} />
        <Tabs.Screen name="Perfil" options={{ title: 'Perfil' }} />
      </Tabs>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default Login;
