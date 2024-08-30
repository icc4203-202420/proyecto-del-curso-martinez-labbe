import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import CottageIcon from '@mui/icons-material/Cottage';
import Home from './components/Home';
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
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;