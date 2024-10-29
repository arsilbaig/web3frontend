import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SharedLoader from '../shared-components/SharedLoader';

const NotFound = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                padding: 2,
            }}
        >
            {isLoading ? (
                <>
                    <SharedLoader isLoading={isLoading} fullScreen={false} />
                </>
            ) : (
                <>
                    <Typography variant="h1" component="h2" sx={{ fontSize: '6rem', color: '#1976d2' }}>
                        404
                    </Typography>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        Oops! Page not found.
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                        The page you are looking for does not exist.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={(() => navigate("/dashboard"))}
                        sx={{ textDecoration: 'none' }}
                    >
                        Go to Homepage
                    </Button>
                </>
            )}
        </Box>
    );
};

export default NotFound;
