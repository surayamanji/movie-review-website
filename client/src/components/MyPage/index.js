import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '/workspaces/project-deliverable-3-surayamanji/client/src/components/AppBar.js';

const MyPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavigationBar />
            <Typography variant="h3" color="inherit" noWrap>
                This is MyPage Page
            </Typography>
        </div>
    )
}
export default MyPage;
