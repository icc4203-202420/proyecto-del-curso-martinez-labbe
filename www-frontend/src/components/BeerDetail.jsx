import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import fetchAxios from '../Hooks/fetchaxios';

const BeerDetail = () => {
    
    const { id } = useParams();  // `id` is the beer ID
    const [beer, setBeer] = useState({});
    const [reviews, setReviews] = useState([]);
    const [canSubmit, setCanSubmit] = useState(true);
    const logUser = JSON.parse(localStorage.getItem('loguser'));  // Logged-in user info
    const navigate = useNavigate();  // Added navigate for redirection

    // Create Yup validation schema
    const validationSchema = Yup.object({
        review: Yup.string()
            .test(
                'minWords',
                'La reseña debe tener al menos 15 palabras',
                value => value && value.split(' ').filter(word => word.length > 0).length >= 15
            )
            .required('Reseña es obligatoria'),
        rating: Yup.number()
            .min(1, 'El valor mínimo es 1')
            .max(5, 'El valor máximo es 5')
            .required('La calificación es obligatoria')
    });
    
    
    
    

    // Formik for review form submission
    // Formik for review form submission
const formik = useFormik({
    initialValues: {
        review: '',
        rating: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, validateForm }) => {
        try {
            const data = {
                user_name: logUser.first_name,  // Ensure the correct user association
                user_id: logUser.id,  // Ensure the correct user association
                beer_id: id,          // Ensure the correct beer association
                text: values.review,  // Rename if backend expects 'text' instead of 'review'
                rating: values.rating
            };

            console.log('Submitting review:', data);

            // Submit the review to the API
            const response = await fetchAxios.post(`users/${logUser.id}/reviews`, data);

            // Update the reviews state after successful submission
            setReviews([...reviews, response.data]);

            alert('Reseña enviada correctamente');
        } catch (error) {
            console.error('Error submitting the review:', error.response ? error.response.data : error.message);
        } finally {
            setSubmitting(false);
        }
    }
});


    useEffect(() => {
        fetchAxios.get(`/beers/${id}`)
            .then(response => {
                setBeer(response.data.beer);
            })
            .catch(error => {
                console.error('Error fetching the beer:', error);
            });
    }, [id]);

    // Fetch reviews for the logged-in user
    useEffect(() => {
        fetchAxios.get(`reviews`)
            .then(response => {
                setReviews(response.data.reviews);
            })
            .catch(error => {
                console.error('Error fetching the reviews:', error);
            });
    }, [id, logUser.id]);

    useEffect(() => {
        fetchAxios.get(`users/${id}/reviews`)
            .then(response => {
                setReviews(response.data.reviews);
                const userHasReviewed = response.data.reviews.some(review => review.user_id === logUser.id);
                setCanSubmit(!userHasReviewed);
            })
            .catch(error => {
                console.error('Error fetching the reviews:', error);
            });
    }, [id, logUser.id]);


    

    let averageRating = 0;

if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0); // Convert rating to a number
    averageRating = totalRating / reviews.length;
}



// Display average rating rounded to one decimal
    
    

    
        

   
    return (
        <>
            <div className="home-bares-container">
                {/* Display beer details */}
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
                <Card>
                    <CardHeader title="Deja una Reseña" />
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                label="Reseña"
                                name="review"
                                value={formik.values.review}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.review && Boolean(formik.errors.review)}
                                helperText={formik.touched.review && formik.errors.review}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Calificación"
                                name="rating"
                                type="number"  // Ensure rating is a number
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rating && Boolean(formik.errors.rating)}
                                helperText={formik.touched.rating && formik.errors.rating}
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
                                Enviar Reseña
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader title="Tus Reseñas" />
                    <CardContent>
                        
                        {reviews.map(review => (
                            <div key={review.id}>
                                {parseInt(id) === parseInt(review.beer_id) && (
                                    <Card>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            {review.text}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" component="p">
                                            {review.rating}
                                        </Typography>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title="Calificación Promedio" />
                    <CardContent>
                        <Typography variant="h4" color="textPrimary" component="p">
                            {averageRating.toFixed(1)}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        {reviews.map(review => (
                            <div key={review.id}>
                                {parseInt(logUser.id) === parseInt(review.user_id) && (
                                    <Card>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            Reseña tuya {review.rating}
                                        </Typography>
                                        
                                    </Card>
                                )}
                            </div>
                        ))}
                    </CardContent>
                    

                </Card>
            </div>
        </>
    );
};

export default BeerDetail;
