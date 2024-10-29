import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function DashboardHeader({ title, actionBtns }) {
    const navigate = useNavigate()
    return (
        <Container maxWidth={false} className='flex justify-between items-center gap-5 md:flex-nowrap flex-wrap p-0 px-5 py-10'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={(() => navigate(-1))} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">{title}</Typography>
            </Box>
            <Container maxWidth={false} className='flex md:justify-end justify-center p-0'>
                {actionBtns()}
            </Container>
        </Container>
    );
}

DashboardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    actionBtns: PropTypes.func.isRequired,
};

export default DashboardHeader;
