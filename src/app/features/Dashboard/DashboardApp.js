import * as React from 'react';
import PropTypes from 'prop-types';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import DashboardPage from './DashboardPage';
import TitlePage from '../Titles/TitlesApp';
import NavigationApp from './NavigationApp';
import { Container, useMediaQuery } from '@mui/material';
import SignInPage from '../auth/SignInPage';
import SignUpPage from '../auth/SignUpPage';
import SignOutPage from '../auth/SignOutPage';
import { useDispatch } from 'react-redux';

function DashboardApp(props) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch()

    return (
        <BrowserRouter>
            <Routes>
                {!token && (
                    <>
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="/sign-out" element={<SignOutPage />} />
                    </>
                )}
                <Route
                    path="/*"
                    element={
                        <NavigationApp>
                            <DashboardLayout maxWidth={false} sx={{ padding: 0 }}>
                                <Container
                                    maxWidth={false}
                                    sx={{
                                        overflow: "auto",
                                        height: "100%",
                                        width: !isSmallScreen ? "100vw" : "calc(96vw - 230px)",
                                        padding: 0
                                    }}
                                >
                                    <Routes>
                                        <Route path="titles" element={<TitlePage />} />
                                        <Route path="/dashboard" element={<DashboardPage />} />
                                        <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                                </Container>
                            </DashboardLayout>
                        </NavigationApp>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

DashboardApp.propTypes = {
    window: PropTypes.func,
};

export default DashboardApp;
