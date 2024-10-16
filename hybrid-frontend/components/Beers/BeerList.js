import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

function BeerList() {
    const [beers, setBeers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>{
        fetchBeers();
    }, []);

    const fetchBeers = () => { 
        fetch('https://localhost:3001/api/v1/beers') //modificar la url
        .then(response => response.json())
        .then(data => setBeers(data))
        .catch(error => console.error('Error fetching beers:', error));
    };

    const filteredBeers = beers.filter(beer => 
        beer.name.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <View>
            <TextInput 
            placeholder='Busca Cerveza...'
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{ padding:10, borderBottomWidth:1, margin:10}}
            />

            <FlatList
            data={filteredBeers}
            keyExtractor={beer => beer.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('BeerDetail', {beerId: item.id})}>
                    <Text style ={{ padding:10, borderBottomWidth: 1}}>{item.name}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
    );
}

export default BeerList;