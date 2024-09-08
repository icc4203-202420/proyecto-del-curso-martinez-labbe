import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../BeerList.css'; // Import the CSS file


function BeerList() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const logUser = JSON.parse(localStorage.getItem('loguser')); // Logged-in user info


  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/beers')
      .then(response => {
        setBeers(response.data.beers); // Update state with beers data
      })
      .catch(error => {
        console.error('Error fetching the beers:', error);
      });
  }, []);


  // Filter beers based on the search term
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
          <React.Fragment key={beer.id}>
            {logUser ? (
              // If user is logged in, render a clickable link to the beer details
              <Link to={`/beers/${beer.id}`} className="beer-link">
                <ListItem className="beer-list-item">
                  <ListItemIcon>
                    {/* Add icon for each beer */}
                  </ListItemIcon>
                  <ListItemText primary={beer.name} />
                </ListItem>
              </Link>
            ) : (
              // If user is not logged in, render the beer name without the link
              <ListItem className="beer-list-item">
                <ListItemIcon>
                  {/* Add icon for each beer */}
                </ListItemIcon>
                <ListItemText primary={beer.name} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}


export default BeerList;
