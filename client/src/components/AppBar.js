import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ()  => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: "#708871"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily:'Courier New' }}>
                        Rotten Potatoes
                    </Typography>
                    <Button id="nav-landing" sx ={{color:"#FEF3E2", fontFamily:'Courier New'}} onClick={() => navigate ("/")}>Landing</Button>
                    <Button id="nav-search" sx ={{color:"#FEF3E2", fontFamily:'Courier New'}} onClick={() => navigate ("/Search")}>Search</Button>
                    <Button id="nav-review" sx ={{color:"#FEF3E2", fontFamily:'Courier New'}} onClick={() => navigate ("/Review")}>Review</Button>
                    <Button id="nav-myPage" sx ={{color:"#FEF3E2", fontFamily:'Courier New'}} onClick={() => navigate ("/MyPage")}>My Page</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;