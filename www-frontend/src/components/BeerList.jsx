import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BeerList() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/v1/beers')
      .then(response => {
        console.log('Beers data:', response.data); // Verifica la respuesta de la API
        setBeers(response.data);
      })
      .catch(error => {
        console.error('Error fetching the beers:', error);
      });
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Lista de Cervezas</h2>
      <input
        type="text"
        placeholder="Buscar cerveza..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredBeers.map(beer => (
          <li key={beer.id}>{beer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BeerList;
