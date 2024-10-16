import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Auth/Login';
import Home from './components/Home';
import Register from './components/Auth/Register';
import BeerList from './components/Beers/BeerList';    // Importamos BeerList
import BeerDetails from './components/Beers/BeerDetails';  // Importamos BeerDetails

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" options={{ title: 'Login' }}>
              {props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" options={{ title: 'Home' }}>
              {props => <Home {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
            {/* Agregamos de nuevo las pantallas de BeerList y BeerDetails */}
            <Stack.Screen name="BeerList" component={BeerList} options={{ title: 'Beer List' }} />
            <Stack.Screen name="BeerDetails" component={BeerDetails} options={{ title: 'Beer Details' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
