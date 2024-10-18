import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Auth/Login';
import Home from './components/Home';
import Register from './components/Auth/Register';
import BeerList from './components/Beers/BeerList';
import BeerDetails from './components/Beers/BeerDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for user data in AsyncStorage on app start
  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true); // Set to true if user data exists
        }
      } catch (error) {
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" options={{ title: 'Home' }}>
              {props => <Home {...props} user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="BeerList" component={BeerList} options={{ title: 'Beer List' }} />
            <Stack.Screen name="BeerDetails" options={{ title: 'Beer Details' }}>
              {props => <BeerDetails {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{ title: 'Login' }}>
              {props => (
                <Login 
                  {...props} 
                  setIsAuthenticated={setIsAuthenticated} 
                  setUser={setUser} // Pass setUser to Login
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
