import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NavigationBar from '/workspaces/project-deliverable-3-surayamanji/client/src/components/AppBar.js';

const MyPage = () => {
    const [watchlistName, setWatchlistName] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [watchlist, setWatchlist] = useState([]);
    const [allWatchlists, setAllWatchlists] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/getMovies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchAllWatchlists = async () => {
            try {
                const response = await fetch('/api/getAllWatchlists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const watchlists = await response.json();
                setAllWatchlists(watchlists);
            } catch (error) {
                console.error('Error fetching watchlists:', error);
            }
        };

        fetchMovies();
        fetchAllWatchlists();
    }, []);

    const fetchAllWatchlists = async () => {
        try {
            const response = await fetch('/api/getAllWatchlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const watchlists = await response.json();
            setAllWatchlists(watchlists);
            return watchlists; 
        } catch (error) {
            console.error('Error fetching watchlists:', error);
        }
    };

    const handleAddMovie = () => {
        if (selectedMovie && !watchlist.includes(selectedMovie)) {
            setWatchlist([...watchlist, selectedMovie]);
            setSelectedMovie('');
            setError('');
        } else {
            setError('Please select a movie or movie already added.');
        }
    };

    const handleSubmitWatchlist = async () => {
        if (!watchlistName) {
            setError('Please enter a watchlist name.');
            return;
        }
        try {

            const response = await fetch('/api/createWatchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: 1, 
                    name: watchlistName,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            const { watchlistID } = data;

      
            for (const movieID of watchlist) {
                await fetch('/api/addMovieToWatchlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        watchlistID: watchlistID,
                        movieID: movieID,
                    }),
                });
            }


            setWatchlistName('');
            setWatchlist([]);
            setError('');


            const updatedWatchlists = await fetchAllWatchlists();
            setAllWatchlists(updatedWatchlists);
        } catch (error) {
            console.error('Error submitting watchlist:', error);
            setError('Error submitting watchlist.');
        }
    };

    return (
        <div>
            <NavigationBar />
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ fontFamily: 'Courier New' }} textAlign="center">
                            Create and Submit Your Watchlist
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Watchlist Name"
                            variant="outlined"
                            fullWidth
                            value={watchlistName}
                            onChange={(e) => setWatchlistName(e.target.value)}
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Movie</InputLabel>
                            <Select
                                value={selectedMovie}
                                onChange={(e) => setSelectedMovie(e.target.value)}
                                label="Movie"
                            >
                                {movies.map((movie) => (
                                    <MenuItem key={movie.id} value={movie.id}>
                                        {movie.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleAddMovie}
                                sx={{ fontFamily: 'Courier New' }}
                            >
                                Add Movie
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {error && <Typography color="error" textAlign="center">{error}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmitWatchlist}
                                sx={{ fontFamily: 'Courier New' }}
                            >
                                Submit Watchlist
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} mt={4}>
                        <Typography variant="h4" sx={{ fontFamily: 'Courier New', textAlign: 'center' }}>
                            All Watchlists
                        </Typography>
                        <Box mt={2} sx={{ overflowY: 'scroll', maxHeight: '60vh' }}>
                            {allWatchlists.length > 0 ? (
                                allWatchlists.map((watchlist) => (
                                    <Box key={watchlist.watchlistID} sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 4 }}>
                                        <Typography variant="h6" sx={{ fontFamily: 'Courier New', fontWeight: 600, color: '#333' }}>
                                            {watchlist.name}
                                        </Typography>
                                        <Box>
                                            {watchlist.movies.length > 0 ? (
                                                watchlist.movies.map((movieID) => {
                                                    const movie = movies.find(m => m.id === movieID);
                                                    if (!movie) return null; 
                                                    return (
                                                        <Typography key={movieID} variant="body1">
                                                            {movie.name}
                                                        </Typography>
                                                    );
                                                })
                                            ) : (
                                                <Typography variant="body1">No movies added.</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1" textAlign="center">No watchlists available.</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default MyPage;
