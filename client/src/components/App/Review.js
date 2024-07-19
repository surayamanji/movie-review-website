
import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Review = (props) => {


  const [movies, setMovies] = React.useState([])
  const initialMovies = [
    'Good Will Hunting',
    'Mean Girls',
    'Barbie',
    'Grown Ups',
    'The Shawshank Redemption',
  ];

  React.useEffect(() => {
    setMovies(initialMovies)
  }, [])

 // Selecting a movie
  const [selectedMovie, setMovie] = React.useState("")
  const handleMovieChange = (event) => {
    setMovie(event.target.value)
  }

  // Entering a Movie Title
  const [enteredTitle, setTitle] = React.useState("")
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  // Writing a Review
  const [enteredReview, setReview] = React.useState("")
  const handleReviewChange = (event) => {
    setReview(event.target.value)
  }

  // Selecting a Rating
  const [selectedRating, setRating] = React.useState("")
  const handleRatingChange = (event) => {
    setRating(event.target.value)
  }


  const [submitMovie, setMovieError] = React.useState("")
  const [submitTitle, setTitleError] = React.useState("")
  const [submitReview, setReviewError] = React.useState("")
  const [submitRating, setRatingError] = React.useState("")
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [userID, setUserID] = React.useState(1);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/getMovies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
        const data = await response.json();
        setMovies(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSubmit = async () => {
    if (!selectedMovie) {
      setMovieError(true)
    }
    else {
      setMovieError(false) 
    }
    if (!enteredTitle) {
      setTitleError(true)
    }
    else {
      setTitleError(false) 
    }
    if (!enteredReview) {
      setReviewError(true)
    }
    else {
      setReviewError(false) 
    }
    if (!selectedRating) {
      setRatingError(true)
    }
    else {
      setRatingError(false) 
    }
    if (selectedMovie && enteredTitle && enteredReview && selectedRating) {
      setFormSubmitted(true);
      try {
        const response = await fetch('/api/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID: userID,
            movieID: selectedMovie,
            reviewTitle: enteredTitle,
            reviewContent: enteredReview,
            reviewScore: selectedRating
          })
        });
        if (response.ok) {
          console.log('Review submitted successfully');
        } else {
          console.error('Error submitting review');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } 
    else {
      setFormSubmitted(false);
    }
  }

 

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, p:5}}>
              <Grid container spacing={2} alignItems="center" justify="center">
              <Grid item xs={12}>
              <Typography variant="h3" sx={{fontFamily:'Courier New'}}>
                <center>
                Review a Movie
                </center>
              </Typography>
              </Grid>
                <Grid item xs={6}>
                  <MovieSelection
                    movies = {movies}
                    selectedMovie = {selectedMovie} 
                    handleMovieChange = {handleMovieChange} 
                  /> 
                  {submitMovie && <Typography color="error">Select your movie</Typography>}
                  </Grid>
                  <Grid item xs={6}>
                  <ReviewTitle
                    enteredTitle = {enteredTitle} 
                    handleTitleChange = {handleTitleChange} 
                  />
                  {submitTitle && <Typography color="error">Enter your review title</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                  <ReviewBody
                    enteredReview = {enteredReview} 
                    handleReviewChange = {handleReviewChange} 
                  />
                  {submitReview && <Typography color="error">Enter your review</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" border={1} borderRadius="borderRadius" p={1}>
                  <ReviewRating
                    selectedRating = {selectedRating} 
                    handleRatingChange = {handleRatingChange} 
                  />
                  </Box>
                  {submitRating && <Typography color="error">Select the Rating</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                  <Box display="flex" justifyContent="center">
                    <Button variant="contained" color="success" onClick = {handleSubmit} id="submit-button" sx={{fontFamily:'Courier New'}}> Submit </Button>
                  </Box>
                  </Grid>

                  {formSubmitted && (
                  <Grid item xs={12}>
                    <Typography variant="h6" id = "confirmation-message">Your review has been received</Typography>
                    <Typography variant="body1">Movie: {movies.find(movie => movie.id === selectedMovie)?.name}</Typography>
                    <Typography variant="body1">Title: {enteredTitle}</Typography>
                    <Typography variant="body1">Review: {enteredReview}</Typography>
                    <Typography variant="body1">Rating: {selectedRating}</Typography>
                  </Grid>
                  )}
                  </Grid>
        </Box>
      </div>
    </>
  );
}

export default Review;
