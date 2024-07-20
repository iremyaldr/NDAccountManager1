import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
      clientId: 'c2aa1a1e-393d-4010-9f8a-6d18b2e51628',
      authority: 'https://login.microsoftonline.com/3884b741-6fbc-4df8-9924-a522e881d601',
      redirectUri: 'http://localhost:3000',
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
