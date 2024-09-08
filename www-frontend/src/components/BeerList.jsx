import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
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
      
          <IconButton edge="start" color="inherit" aria-label="menu">
            {/* Add menu icon */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lista de Cervezas
          </Typography>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar cerveza..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
      <Drawer>
        <List>
          {/* Add list items for navigation */}
        </List>
      </Drawer>
      <ul className="beer-list-container">
        {filteredBeers.map(beer => (
          <Link to={`/beers/${beer.id}`} key={beer.id}>
          <ListItem key={beer.id} className="beer-list-item">
            <ListItemIcon>
              {/* Add icon for each beer */}
            </ListItemIcon>
            <ListItemText primary={beer.name} />
          </ListItem>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default BeerList;

