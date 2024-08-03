import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavigationBar from '/workspaces/project-deliverable-3-surayamanji/client/src/components/AppBar.js';

const Search = () => {   
    const [title, setTitle] = useState('');
    const [actor, setActor] = useState('');
    const [director, setDirector] = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleSearch = async () => {
        if (!title && !actor && !director) {
            setOpen(true);
            return;
        }

        try {
            const response = await fetch('/api/searchMovies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, actor, director }),
            });
            const data = await response.json();
            console.log(data);
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <Box sx={{ flexGrow: 1, p:5}}>
                <Grid container spacing={2} alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{fontFamily:'Courier New'}}>
                            <center>
                            Search Movies
                            </center>
                        </Typography>

                        <Grid item xs={12}>
                            <p>Search by Movie Title</p>
                            <TextField 
                                label="Movie Title" 
                                variant="outlined" 
                                id="search-title"
                                fullWidth 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ bgcolor: 'white', borderRadius: 1 }} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <p>Search by Actor</p>
                            <TextField 
                                label="Actor (First + Last Name)" 
                                variant="outlined" 
                                id="search-actor"
                                fullWidth 
                                value={actor}
                                onChange={(e) => setActor(e.target.value)}
                                sx={{ bgcolor: 'white', borderRadius: 1 }} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <p>Search by Director</p>
                            <TextField 
                                label="Director (First + Last Name)" 
                                variant="outlined" 
                                id="search-director"
                                fullWidth 
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                sx={{ bgcolor: 'white', borderRadius: 1 }} 
                            />
                        </Grid>
                        <Box display="flex" justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="success" 
                                id="search-button" 
                                sx={{fontFamily:'Courier New'}}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontFamily: 'Courier New', fontWeight: 600, color: '#333' }}>
                    Search Results
                </Typography>
                {results.map((movie, index) => (
                    <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #333', borderRadius: 4 }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Courier New', fontWeight: 600, color: '#333' }}>
                            {movie.name}
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Courier New', fontWeight: 400, color: '#333' }}>
                            <strong>Movie Director(s):</strong> {movie.directors}
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Courier New', fontWeight: 400, color: '#333' }}>
                            <strong>Average Rating:</strong> {movie.averageScore || 'N/A'}
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Courier New', fontWeight: 400, color: '#333' }}>
                            <strong>Movie Reviews:</strong> {movie.reviews ? movie.reviews.split('\n').map((review, i) => (
                                <Typography key={i} variant="body2" sx={{ fontFamily: 'Courier New', fontWeight: 400, color: '#333', display: 'block' }}>
                                    {review}
                                </Typography>
                            )) : 'No reviews'}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </div>
    )
}

export default Search;
