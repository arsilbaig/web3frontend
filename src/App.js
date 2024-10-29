import React from 'react';
import Dashboard from './app/features/Dashboard/DashboardApp';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;

