import React, { useState } from 'react';

const FriendList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container">
      <h2 className="heading">Friend List</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {/* Display a message or other content based on searchTerm if needed */}
      {searchTerm && <p className="message">Searching for: {searchTerm}</p>}
    </div>
  );
}

export default FriendList;
