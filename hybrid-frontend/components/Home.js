import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({ navigation,setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false); //Cierre de sesion
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to Home</Text>
      <Button
        title="Buscar Cerveza"
        onPress={() => navigation.navigate('BeerList')}
      />
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}
