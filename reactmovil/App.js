import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListProdutScreen from './screens/ListProdutScreen';
import FormularioScreen from './screens/FormularioScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Productos">
        <Stack.Screen name="Productos" component={ListProdutScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
