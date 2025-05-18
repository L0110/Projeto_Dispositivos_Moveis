import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Stopwatch from "@/components/Stopwatch";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cronômetro" component={Stopwatch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;