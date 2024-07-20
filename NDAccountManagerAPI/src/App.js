import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography, Container } from '@mui/material';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './actions/store';
import AccountInfo from './components/accountInfo';
import './App.css';

const TabNavigation = () => {
  return (
    <AppBar position="static">
      <Tabs aria-label="home tabs">
        <Tab label="Personal" component={Link} to="/personal" />
        <Tab label="Shared" component={Link} to="/shared" />
      </Tabs>
    </AppBar>
  );
};

const PersonalPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Personal Account Information</Typography>
      <AccountInfo />
    </Box>
  );
};

const SharedPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Shared Account Information</Typography>
      <Typography variant="body1">Shared Content Here</Typography>
    </Box>
  );
};

const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'select_account',
      })
      .catch((error) => console.log(error));
  };

  if (!activeAccount) {
    return (
      <UnauthenticatedTemplate>
        <div className="login-container">
          <h1>ND Account Manager</h1>
          <p className="description">
            Hesaplarınızı yönetmeye hemen başlayın. Kişisel ve paylaşılan hesap bilgilerini görüntüleyebilir, düzenleyebilir ve paylaşabilirsiniz.
          </p>
          <button className="login-button" onClick={handleRedirect}>
            Sign in with Microsoft
          </button>
        </div>
      </UnauthenticatedTemplate>
    );
  }

  return (
    <AuthenticatedTemplate>
      <Router>
        <TabNavigation />
        <Container maxWidth="lg">
          <Box mt={2}>
            <Routes>
              <Route path="/personal" element={<PersonalPage />} />
              <Route path="/shared" element={<SharedPage />} />
              <Route path="*" element={<Navigate to="/personal" />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </AuthenticatedTemplate>
  );
};

/**
 * The App component is the main component of the application.
 * It wraps all other components with the Provider and MsalProvider.
 *
 * @param {Object} props - The props object.
 * @param {PublicClientApplication} props.instance - The instance of the MsalProvider.
 * @returns {JSX.Element} - The rendered App component.
 */
const App = ({ instance }) => {
  return (
    // The Provider component wraps all other components with the Redux store.
    <Provider store={store}>
      {/* The ToastProvider component provides the toast notifications. */}
      <ToastProvider autoDismiss={true}>
        {/* The MsalProvider component provides the Msal authentication logic. */}
        <MsalProvider instance={instance}>
          {/* The Container component sets the maximum width of the component. */}
          <Container maxWidth="lg">
            {/* The WrappedView component is the component that is wrapped with the MsalProvider. */}
            <WrappedView />
          </Container>
        </MsalProvider>
      </ToastProvider>
    </Provider>
  );
};

export default App;
