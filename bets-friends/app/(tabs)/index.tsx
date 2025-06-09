import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@/src/pages/Home';
import Login from '@/src/pages/Login';
import Game01 from '@/src/pages/jogos/Game01';
import Game02 from '@/src/pages/jogos/Game02';
import Game03 from '@/src/pages/jogos/Game03';
import Perfil from '@/src/pages/Perfil';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game01" component={Game01} />
        <Stack.Screen name="Game02" component={Game02} />
        <Stack.Screen name="Game03" component={Game03} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
export { Login };
export { Home };
export { Game01 };
export { Game02 };
export { Game03 };
export { Perfil };