import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

function BeerDetails({ route }) {
  const { beerId } = route.params;
  const [beer, setBeer] = useState(null);

  useEffect(() => {
    fetchBeerDetails();
  }, []);

  const fetchBeerDetails = () => {
    fetch(`http://192.168.0.2.:3001/api/v1/beers/${beerId}`)  // Cambia la URL según sea necesario
      .then(response => response.json())
      .then(data => setBeer(data.beer))
      .catch(error => console.error('Error fetching beer details:', error));
  };

  if (!beer) {
    return <Text>Cargando detalles...</Text>;
  }

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{beer.name}</Text>
      <Text style={{ fontSize: 18 }}>Cervecería: {beer.brewery.name}</Text>
      <Text style={{ fontSize: 18 }}>Bares que sirven esta cerveza:</Text>
      {beer.bars.map(bar => (
        <Text key={bar.id} style={{ paddingLeft: 20 }}>{bar.name}</Text>
      ))}
    </View>
  );
}

export default BeerDetails;
