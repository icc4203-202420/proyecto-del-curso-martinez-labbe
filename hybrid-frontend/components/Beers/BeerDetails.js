import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BeerDetails({ route }) {
  const { beerId } = route.params;
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeerDetails();
  }, []);

  const fetchBeerDetails = () => {
    fetch(`http://192.168.0.13:3001/api/v1/beers/${beerId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching beer details');
        }
        return response.json();
      })
      .then(data => {
        console.log('Beer data:', data); // Verificar los datos en la consola
        setBeer(data); // Aquí debe ser `data`, ya que tu API está devolviendo toda la cerveza dentro de este objeto
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching beer details:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <Text>Cargando detalles...</Text>;
  }

  // Si no se encuentra cerveza
  if (!beer) {
    return <Text>No se encontraron detalles de la cerveza.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Nombre de la cerveza */}
      <Text style={styles.beerName}>{beer.name}</Text>

      {/* Detalles de la cerveza */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Estilo: </Text>
        <Text style={styles.info}>{beer.style || 'No disponible'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Lúpulo: </Text>
        <Text style={styles.info}>{beer.hop || 'No disponible'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Levadura: </Text>
        <Text style={styles.info}>{beer.yeast || 'No disponible'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Malta: </Text>
        <Text style={styles.info}>{beer.malts || 'No disponible'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>IBU: </Text>
        <Text style={styles.info}>{beer.ibu || 'No disponible'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>BLG: </Text>
        <Text style={styles.info}>{beer.blg || 'No disponible'}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Alcohol: </Text>
        <Text style={styles.info}>{beer.alcohol || 'No disponible'}</Text>
      </View>

      {/* Cervecería */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Cervecería: </Text>
        <Text style={styles.info}>
          {beer.brand?.brewery?.name || 'No disponible'}
        </Text>
      </View>

      {/* Bares */}
      <View style={styles.barsContainer}>
        <Text style={styles.label}>Bares que sirven esta cerveza:</Text>
        {beer.bars && beer.bars.length > 0 ? (
          beer.bars.map(bar => (
            <Text key={bar.id} style={styles.barName}>{bar.name}</Text>
          ))
        ) : (
          <Text style={styles.info}>No disponible</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
  },
  beerName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  barsContainer: {
    marginTop: 20,
  },
  barName: {
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 5,
  },
});

export default BeerDetails;
