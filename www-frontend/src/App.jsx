import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer,Button,styled, List, ListItem, ListItemText, ListItemIcon, Card, CardHeader, CardContent } from '@mui/material';
import './App.css';
import Beer from './assets/beer.svg';
import Log_bar from './assets/login_bar.svg';

function App() {
  return (
    <div className="container">
      <img src={Beer} alt="beer" className='beer-icon'/>
      <Card className='log_in'>
          <CardHeader title="Welcome to Beer" className='header' / >
          <Button variant="contained" className='log_in_button' styled >Log In</Button>
      </Card>
    </div>
  );
}

export default App;