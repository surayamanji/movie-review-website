import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    <div>
      <p> Select a Movie: </p>
      <FormControl fullWidth>
      <Select
            label="Select a Movie"
            id="movie-select"
            value={props.selectedMovie}
            onChange={props.handleMovieChange}
      >
         {props.movies.map((title, index) => (
            <MenuItem
              key={index}
              value={title.id}
            >
              {title.name}
            </MenuItem>
          ))}
      </Select>
      </FormControl>
    </div>

    
    </>
  );

}


export default MovieSelection;