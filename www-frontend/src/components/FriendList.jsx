import React, { useState, useEffect } from 'react';
import fetchAxios from '../Hooks/fetchaxios';
import '../FriendList.css';


const FriendList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]); // Lista de amigos

  useEffect(() => {
    const searchFriends = async () => {
      if (searchTerm.trim() !== '') {
        try {
          const response = await fetchAxios.get(`/users/search?handle=${searchTerm}`);
          setSearchResults(response.data); // Almacena los resultados de búsqueda
        } catch (error) {
          console.error('Error searching for friends:', error);
        }
      } else {
        setSearchResults([]); // Limpiar resultados si no hay término de búsqueda
      }
    };
    searchFriends();
  }, [searchTerm]);

  // Función para seguir a un amigo
  const followFriend = async (friendId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('loguser')); // Obtener el usuario actual logueado
      const response = await fetchAxios.post('/friendships', {
        friendship: { user_id: currentUser.id, friend_id: friendId }
      });

      if (response.status === 200) {
        // Actualizar la lista de amigos
        setFriends([...friends, searchResults.find(friend => friend.id === friendId)]);
        alert('Amigo agregado con éxito');
      }
    } catch (error) {
      console.error('Error al agregar amigo:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Buscar Amigos</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por handle..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {searchResults.length > 0 ? (
      <ul className="friend-list">
        {searchResults.map(friend => (
          <li key={friend.id} className="friend-item">
            <div className="friend-info">
              <span className="friend-name">{friend.first_name} {friend.last_name}</span>
              <span className="friend-handle">{friend.handle}</span>
            </div>
            <button className="follow-button" onClick={() => followFriend(friend.id)}>Seguir</button>
          </li>
        ))}
      </ul>
      ) : (
        <p>No se encontraron resultados</p>
      )}

      <div className="friends-container">
        <h3 className="friends-heading">Amigos</h3>
        {friends.length > 0 ? (
          <ul className="friends-list">
            {friends.map(friend => (
              <li key={friend.id} className="friend-item">
                {friend.first_name} {friend.last_name} ({friend.handle})
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes amigos aún.</p>
        )}
      </div>
    </div>
  );
};

export default FriendList;
