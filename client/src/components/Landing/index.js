import React from 'react';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '/workspaces/project-deliverable-3-surayamanji/client/src/components/AppBar.js';



const Landing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavigationBar />
            <Typography variant="h3" align="center" sx={{fontFamily:'Courier New'}}>
                Welcome to the Rotten Potatoes
            </Typography> 
            <Typography variant="h3" align="center" sx={{fontFamily:'Courier New'}}>
            Moview Review Website!
            </Typography>
            <Typography variant="h5" align="center" sx={{fontFamily:'Courier New'}}>
            This is your one stop shop for all things movie. Enter reviews, read reviews search movies and more!
            </Typography>             
            <Box sx={{ flexGrow: 1, p:5}}>
              <Grid container spacing={2} alignItems="center" justify="center" sx ={{color:"#FEF3E2", fontFamily:'Courier New'}}>
                    <Grid item xs={12} textAlign="center">
                        <Button id="nav-search" variant="contained" sx={{backgroundColor: "#708871", fontFamily:'Courier New', width: '200px'}} onClick={() => navigate ("/Search")}>Search </Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Button id="nav-review" variant="contained" sx={{backgroundColor: "#708871", fontFamily:'Courier New', width: '200px'}} onClick={() => navigate ("/Review")}>Review</Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Button id="nav-myPage" variant="contained" sx={{backgroundColor: "#708871", fontFamily:'Courier New', width: '200px'}} onClick={() => navigate ("/MyPage")}>MyPage</Button>
                    </Grid>
              </Grid>
            </Box>

        </div>
    )
}
export default Landing;
