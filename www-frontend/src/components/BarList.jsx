import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BarList() {
  const [bars, setBars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener la lista de bares
    axios.get('http://localhost:3001/api/v1/bars') // Cambié la URL para ser explícito
      .then(response => {
        console.log('Bars data:', response.data.bars); // Asegúrate de que los datos estén correctos
        setBars(response.data.bars); // Asumiendo que 'bars' es la clave que contiene la lista de bares
      })
      .catch(error => {
        console.error('Error fetching the bars:', error);
      });
  }, []);

  // Filtrar bares por nombre
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
