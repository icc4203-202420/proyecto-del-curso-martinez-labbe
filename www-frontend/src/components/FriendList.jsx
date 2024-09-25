import React, { useState, useEffect } from 'react';
import fetchAxios from '../Hooks/fetchaxios';
import '../FriendList.css';


const FriendList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
  
      {/* Mostrar los resultados de la búsqueda */}
      {searchResults.length > 0 ? (
        <ul className="friend-list">
          {searchResults.map(friend => (
            <li key={friend.id} className="friend-item">
              <span className="friend-name">{friend.first_name} {friend.last_name}</span> ({friend.handle})
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
};

export default FriendList;
