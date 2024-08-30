import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Tabs, Tab, Card, CardMedia, CardContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './HomeBares.css'; 

function HomeBares() {
  return (
    <div className="home-bares-container">
      {/* AppBar */}
      {/* <AppBar position="sticky" className="app-bar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            Beer
          </Typography>
        </Toolbar>
      </AppBar> */}

      {/* Header */}
      <div className="header">
        <Typography variant="h5" className="question">
        ¿Qué hay para <span className="highlight">beber</span> hoy?
        </Typography>
        <div className="search-bar">
          <TextField 
            fullWidth 
            variant="outlined" 
            placeholder="Search..." 
            InputProps={{
              startAdornment: <SearchIcon />
            }}
            className="search-input"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <Tabs value={0} aria-label="bares y cervezas" className="tabs">
          <Tab label="BARES" className="tab active" />
          <Tab label="CERVEZAS" className="tab" />
        </Tabs>
      </div>

      {/* List of Bars */}
      <div className="bar-list">
        {/* Bar Card */}
        <Card className="bar-card">
          <CardMedia
            // component="img"
            alt="Bar La Virgen"
            height="140"
          />
          <CardContent>
            <Typography variant="h6">BAR LA VIRGEN</Typography>
            <Typography variant="body2" color="textSecondary">Chile</Typography>
            <Typography variant="body2" color="textSecondary">Av. Vitacura 9191, Vitacura</Typography>
            {/* <LocationOnIcon className="location-icon" /> */}
          </CardContent>
        </Card>

        <Card className="bar-card">
          <CardMedia
            // component="img"
            alt="Bar Teclados"
            height="140"
            // image="/assets/bar_teclados.jpg"
          />
          <CardContent>
            <Typography variant="h6">BAR TECLADOS</Typography>
            <Typography variant="body2" color="textSecondary">Chile</Typography>
            <Typography variant="body2" color="textSecondary">Av. Vitacura 7235, Vitacura, Región Metropolitana</Typography>
            {/* <LocationOnIcon className="location-icon" /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomeBares;
