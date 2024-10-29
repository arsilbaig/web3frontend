import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedLoader from '../shared-components/SharedLoader';
import SharedSnackBar from '../shared-components/SharedSnackBar';

const SignOutPage = () => {
    const [snackOpen, setSnackOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setToken(token)
            navigate(-1)
        } else {
            setIsLoading(true)
            setSnackOpen(true)

            setTimeout(() => {
                navigate("/sign-in")
                setIsLoading(false)
            }, 1000)
        }

    }, [token, navigate])

    if (isLoading) {
        return <SharedLoader isLoading={isLoading} fullScreen={true} />
    }

    return (
        <SharedSnackBar
            setSnackOpen={setSnackOpen}
            snackOpen={snackOpen}
            snackVarient={"success"}
            snackMessage={"Signed out Successfull"}
        />
    );
};

export default SignOutPage;
