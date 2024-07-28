import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
      clientId: 'client_id',
      authority: 'https://login.microsoftonline.com/tenant_id',
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
