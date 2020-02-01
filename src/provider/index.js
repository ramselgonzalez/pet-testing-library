import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../constants/theme';

export const AppProvider = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
