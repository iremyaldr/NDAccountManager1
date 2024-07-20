import { combineReducers } from 'redux';
import { AccountInfo } from './AccountInfo'; // Adjust the path if necessary
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const rootReducer = combineReducers({
  accountInfo: AccountInfo, // Ensure the key matches the slice of state managed by this reducer
  // Add other reducers here if needed
});

export default rootReducer;
const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);