import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import CottageIcon from '@mui/icons-material/Cottage';
import Home from './components/Home';
import BeerList from './components/BeerList'; 
import BarList from './components/BarList'; 
import BarEventsList from './components/BarEventsList'; 
import Beer from './assets/beer.svg';
import './App.css';
import FriendList from './components/FriendList';
import Signup from './components/Signup';

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
              <ListItem button component={Link} to="/events">
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Events" />
              </ListItem>
              <ListItem button component={Link} to="/friends">
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Amigos" />
              </ListItem>
              <ListItem button component={Link} to="/signup">
                <ListItemIcon>
                  <CottageIcon />
                </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beers" element={<BeerList />} />
        <Route path="/bars" element={<BarList />} /> 
        <Route path="/events" element={<BarEventsList />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;