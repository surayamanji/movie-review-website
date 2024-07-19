import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
    <div>
    <p> Enter a Title: </p>
    <FormControl fullWidth>
      <TextField 
      id="review-title" 
      label="Enter review title" 
      variant="outlined"
      onChange={props.handleTitleChange}
      value={props.enteredTitle}
      />
      </FormControl>
    </div>
    
    </>
  );
}

export default ReviewTitle;