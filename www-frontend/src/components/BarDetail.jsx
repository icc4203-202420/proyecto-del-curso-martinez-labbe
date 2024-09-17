import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BarDetail.css'; // Asegúrate de que el archivo CSS esté vinculado correctamente

function BarDetail() {
  const [bar, setBar] = useState(null);
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [attendees, setAttendees] = useState({});
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false); 
  const { barId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); 

  useEffect(() => {
    // Obtener detalles del bar
    axios.get(`http://localhost:3001/api/v1/bars/${barId}`)
      .then(response => {
        setBar(response.data.bar);
      })
      .catch(error => {
        console.error('Error obteniendo detalles del bar:', error);
      });

    // Obtener eventos del bar
    axios.get(`http://localhost:3001/api/v1/bars/${barId}/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error obteniendo eventos del bar:', error);
      });

  }, [barId]);

  useEffect(() => {
    if (!currentUser) return;

    // Verificar si el usuario ya ha hecho "check-in"
    axios.get(`http://localhost:3001/api/v1/bars/${barId}/events/attendances`, {
      params: { user_id: currentUser.id }
    })
    .then((res) => {
      setAttendance(res.data[0]); // Almacenar la asistencia en el estado
    })
    .catch((error) => {
      console.error('Error obteniendo la asistencia:', error);
    });
  }, [barId, currentUser, refresh]);

  const handleCheckIn = (eventId) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para asistir a un evento.');
      return;
    }

    if (attendance) {
      axios.put(`http://localhost:3001/api/v1/attendances/${attendance.id}`, { 
        user_id: currentUser.id, 
        event_id: eventId, 
        checked_in: true 
      })
      .then((res) => {
        setAttendance(res.data.attendance);
        setMessage('Asistencia confirmada');
        setRefresh(!refresh); // Refrescar la página
      })
      .catch((error) => {
        console.error('Error actualizando la asistencia:', error);
        setMessage('Error al confirmar la asistencia');
      });
    } else {
      axios.post(`http://localhost:3001/api/v1/attendances`, { 
        user_id: currentUser.id, 
        event_id: eventId, 
        checked_in: true 
      })
      .then((res) => {
        setAttendance(res.data.attendance);
        setMessage('Asistencia confirmada');
        setRefresh(!refresh); // Refrescar la página
      })
      .catch((error) => {
        console.error('Error al confirmar la asistencia:', error);
        setMessage('Error al confirmar la asistencia');
      });
    }
  };

  const handleShowAttendees = (eventId) => {
    axios.get(`http://localhost:3001/api/v1/bars/${barId}/events/${eventId}/attendees`)
      .then(response => {
        setAttendees(prev => ({ ...prev, [eventId]: response.data }));
      })
      .catch(error => {
        console.error('Error obteniendo asistentes:', error);
      });
  };

  if (!bar) {
    return <div>Cargando detalles del bar...</div>;
  }

  return (
    <div className="bar-detail-container">
      <h1>{bar.name}</h1>
      <p>Dirección: {bar.address.line1}, {bar.address.city}</p>

      <h2 className="events-heading">Eventos</h2>

      <ul className="event-list">
        {events.length === 0 ? (
          <p>No hay eventos disponibles para este bar.</p>
        ) : (
          events.map(event => (
            <li key={event.id} className="event-item">
              <h3>{event.name}</h3>
              <p>Descripción: {event.description}</p>
              <p>Fecha: {new Date(event.start_date).toLocaleString()}</p>

              {/* Botón para confirmar asistencia */}
              <button onClick={() => handleCheckIn(event.id)}>Confirmar asistencia</button>
              {message && <p>{message}</p>}

              {/* Botón para mostrar lista de asistentes */}
              <button onClick={() => handleShowAttendees(event.id)}>Ver asistentes</button>
              {attendees[event.id] && (
                <div>
                  <h4>LISTA DE ASISTENTES</h4>
                  <ul>
                    {attendees[event.id].map(attendee => (
                      <li key={attendee.id}>
                        {attendee.first_name} {attendee.last_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BarDetail;
