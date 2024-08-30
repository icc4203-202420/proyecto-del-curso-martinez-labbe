import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BarList() {
  const [bars, setBars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/v1/bars')
      .then(response => {
        console.log('Bars data:', response.data); // Verifica la respuesta de la API
        setBars(response.data);
      })
      .catch(error => {
        console.error('Error fetching the bars:', error);
      });
  }, []);

  const filteredBars = bars.filter(bar =>
    bar.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Lista de Bares</h2>
      <input
        type="text"
        placeholder="Buscar bar..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredBars.map(bar => (
          <li key={bar.id}>{bar.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BarList;
