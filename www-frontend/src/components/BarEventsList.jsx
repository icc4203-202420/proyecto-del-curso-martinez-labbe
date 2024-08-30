import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BarEventsList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/events')
      .then(response => {
        console.log('Events data:', response.data); // Verifica la respuesta de la API
        setEvents(response.data); // Ajusta la respuesta para manejar todos los eventos
      })
      .catch(error => {
        console.error('Error fetching the events:', error);
      });
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <input
        type="text"
        placeholder="Buscar evento..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredEvents.map(event => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>Bar: {event.bar.name}</p> {/* Muestra el nombre del bar */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BarEventsList;
