import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer,Button,styled, List, ListItem, ListItemText, ListItemIcon, Card, CardHeader, CardContent } from '@mui/material';
// import './App.css';
import Beer from './assets/beer.svg';
import Log_bar from './assets/login_bar.svg';

import Home from './components/Home';

function App() {
  return(<Routes>
    <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;