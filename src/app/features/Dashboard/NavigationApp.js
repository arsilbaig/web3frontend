import * as React from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardTheme } from './DashboardTheme';

import DashboardIcon from '@mui/icons-material/Dashboard';
import TitleIcon from '@mui/icons-material/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import SignInPage from '../auth/SignInPage';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from '../../store/slice/AuthSlice';
import { useDispatch } from 'react-redux';

function NavigationApp(props) {
    const router = useDemoRouter('/dashboard');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const handleNavigation = (path) => {
        router.push(path);
    };

    const [token, setToken] = React.useState(null)

    const NavigationConfig = [
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon onClick={(() => navigate("/dashboard"))} />,
        },
        {
            segment: 'titles',
            title: 'Titles',
            icon: <TitleIcon onClick={(() => navigate("/titles"))} />,
        },
        {
            segment: 'sign-out',
            title: 'Sign Out',
            icon: <ExitToAppIcon
            />,
        },
    ];

    React.useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setToken(token)
            if (router?.pathname === "/sign-out") {
                dispatch(signOut(navigate))
            }
            if (router?.pathname) {
                navigate(router?.pathname)
            }
        } else {
            if (location?.pathname?.includes("sign-up")) {
                navigate("/sign-up")
            } else {
                navigate("/sign-in")
            }
        }

    }, [router?.pathname, token])


    return (
        <AppProvider
            navigation={NavigationConfig}
            theme={DashboardTheme}
            router={router}
            branding={{ title: "Hiring-Task", logo: null }}
        >
            {!token ? (
                <SignInPage handleNavigation={handleNavigation} />
            ) : (
                <>
                    {props?.children}
                </>
            )}
        </AppProvider>
    );
}

NavigationApp.propTypes = {
    window: PropTypes.func,
};

export default NavigationApp;
