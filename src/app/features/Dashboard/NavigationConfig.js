import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TitleIcon from '@mui/icons-material/Title';

export const NavigationConfig = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'titles',
        title: 'Titles',
        icon: <TitleIcon />,
    }
];