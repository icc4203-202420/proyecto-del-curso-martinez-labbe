import React from 'react';
import { useEffect,useState } from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography,
     Card, CardContent,CardHeader} from '@mui/material';
import fetchAxios from './fetchaxios';
import './HomeBares.css';

const BeerDetail = () => 
{
    const { id } = useParams();
    const [beer, setBeer] = useState([]);
    
    useEffect(() => {
    fetchAxios.get(`/beers/${id}`)
        .then(response => {
            setBeer(response.data.beer);
        })
        .catch(error => {
            console.error('Error fetching the beer:', error);
        });
    }, [id]);

    return (
       <>
            <div  className="home-bares-container">
                <Card>
                    <CardHeader title={beer.name} />
                    <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.style}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.hop}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.yeast}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.malts}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.ibu}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.blg}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {beer.alcohol}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default BeerDetail;