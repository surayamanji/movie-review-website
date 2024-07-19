import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { mapProps } from 'recompose';
import FormControl from '@mui/material/FormControl';

const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    <div>
    <p> Enter a Review: </p>
    <FormControl fullWidth>
    <TextField 
      id="review-body"
      label="Enter movie review"
      onChange = {props.handleReviewChange}
      value = {props.enteredReview}
      multiline
    />
    </FormControl>
    </div>
  
    </>
  );
}

export default ReviewBody;