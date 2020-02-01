import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Sidebar } from './components';
import { AppProvider } from './provider';

function App() {
    return (
        <AppProvider>
            <CssBaseline />
            <Sidebar />
        </AppProvider>
    );
}

export default App;
