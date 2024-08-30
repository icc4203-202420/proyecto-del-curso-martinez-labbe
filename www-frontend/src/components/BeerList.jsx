import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../BeerList.css'; // Import the CSS file

function BeerList() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/beers')
      .then(response => {
        setBeers(response.data.beers); // Update state with beers data
      })
      .catch(error => {
        console.error('Error fetching the beers:', error);
      });
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="heading">Lista de Cervezas</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar cerveza..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="beer-list-container">
        {filteredBeers.map(beer => (
          <li key={beer.id} className="beer-list-item">{beer.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BeerList;

