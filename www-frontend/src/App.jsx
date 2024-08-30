import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import CottageIcon from '@mui/icons-material/Cottage';
import Home from './components/Home';
import BeerList from './components/BeerList'; // Importar el componente de cervezas
import BarList from './components/BarList'; // Importar el componente de bares
import Beer from './assets/beer.svg';
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed" className="appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <img src={Beer} alt="beer-icon" className="beer-icon" />
          </IconButton>
          
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/beers">
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Cervezas" />
              </ListItem>
              <ListItem button component={Link} to="/bars">
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Bares" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beers" element={<BeerList />} /> {/* Ruta para las cervezas */}
        <Route path="/bars" element={<BarList />} /> {/* Ruta para los bares */}
      </Routes>
    </>
  );
}

export default App;