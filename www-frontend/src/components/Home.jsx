import React from 'react';
import { Button, Card, CardHeader } from '@mui/material';
import Beer from '../assets/beer.svg';

function Home() {
  return (
    <div className="container">
      <img src={Beer} alt="beer" className='beer-icon' />
      <Card className='log_in'>
        <CardHeader title="Welcome to Beer" className='header' />
        <Button variant="contained" className='log_in_button'>Log In</Button>
      </Card>
    </div>
  );
}

export default Home;
