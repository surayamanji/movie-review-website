import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '/workspaces/project-deliverable-3-surayamanji/client/src/components/AppBar.js';
import Review from '/workspaces/project-deliverable-3-surayamanji/client/src/components/App/Review.js';

const review = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavigationBar />
            <Review />
            
        </div>
    )
}
export default review;
