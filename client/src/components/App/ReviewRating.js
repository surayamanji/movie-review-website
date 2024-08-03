import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const ReviewRating = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    <div>
    <center> <p> Select a Rating: </p> </center>
      <FormControl>
        <RadioGroup
        row
        label="Select a Rating"
        id="selected-rating"
        onChange={props.handleRatingChange}
        >
          <FormControlLabel
          control={<Radio />}
          label="1"
          labelPlacement="bottom"
          />
          <FormControlLabel
          control={<Radio />}
          label="2"
          labelPlacement="bottom"
          value="2"
          />
          <FormControlLabel
          control={<Radio />}
          label="3"
          labelPlacement="bottom"
          value="3"
          />
          <FormControlLabel
          control={<Radio />}
          label="4"
          labelPlacement="bottom"
          value="4"
          />
          <FormControlLabel
          control={<Radio />}
          label="5"
          labelPlacement="bottom"
          value="5"
          />
        </RadioGroup>
      </FormControl>
    </div>

    </>
  );
}

export default ReviewRating;