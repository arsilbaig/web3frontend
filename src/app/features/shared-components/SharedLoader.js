// SharedLoader.js
import React from 'react';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';

const SharedLoader = ({ isLoading, fullScreen }) => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    if (!isLoading) return null;
    return (
        fullScreen ? (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    position: 'fixed',
                    width: '100vw',
                    top: 0,
                    left: 0,
                    backgroundColor: '#000',
                    zIndex: 9999,
                }}
            >
                <CircularProgress size={70} color="primary" />
            </Box>
        ) : (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#121212',
                    width: !isSmallScreen ? "100vw" : "calc(94vw - 230px)",
                }}
            >
                <CircularProgress size={70} color="primary" />
            </Box>
        )
    );
};

export default SharedLoader;
