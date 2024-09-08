import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import fetchAxios from './fetchaxios';

const BeerDetail = () => {
    const { id } = useParams();  // `id` is the beer ID
    const [beer, setBeer] = useState({});
    const [reviews, setReviews] = useState([]);
    const logUser = JSON.parse(localStorage.getItem('loguser'));  // Logged-in user info
    const navigate = useNavigate();  // Added navigate for redirection

    // Create Yup validation schema
    const validationSchema = Yup.object({
        review: Yup.string().min(10, 'La reseña debe tener al menos 10 caracteres').required('Reseña es obligatoria'),
        rating: Yup.number().min(1, 'El valor mínimo es 1').max(5, 'El valor máximo es 5').required('La calificación es obligatoria')
    });

    // Formik for review form submission
    const formik = useFormik({
        initialValues: {
            review: '',
            rating: ''
        },
        validationSchema: validationSchema,  // Attach validation schema
        onSubmit: async (values, { setSubmitting, validateForm }) => {
            try {
                // Ensure the backend receives the required data format including `beer_id`
                const data = {
                    beer_id: id,  // Associate the review with the current beer
                    review: values.review,
                    rating: values.rating
                };

                // Log the data to check what's being sent
                console.log('Submitting review:', data);

                // Submit the review to the API
                const response = await fetchAxios.post(`/users/${logUser.id}/reviews`, data);
                
                // Update the reviews list after successful submission
                setReviews([...reviews, response.data]);
                console.log('Review posted successfully:', response.data);

                alert('Reseña enviada correctamente');
                
                // Optionally, redirect or refresh
                navigate("/");
            } catch (error) {
                console.error('Error submitting the review:', error);
            } finally {
                setSubmitting(false);
                validateForm();  // Run validation after submission
            }
        }
    });

    // Fetch beer details
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
        fetchAxios.get(`/users/${logUser.id}/reviews`)
            .then(response => {
                setReviews(response.data.reviews);
            })
            .catch(error => {
                console.error('Error fetching the reviews:', error);
            });
    }, [id, logUser.id]);

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

                {/* Review submission form */}
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

                {/* Display existing reviews */}
                <Card>
                    <CardHeader title="Reseñas" />
                    <CardContent>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <Typography key={index} variant="body1" color="textSecondary">
                                    {review.review} - Rating: {review.rating}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body1" color="textSecondary">
                                No hay reseñas todavía.
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default BeerDetail;
