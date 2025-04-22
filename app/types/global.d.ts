interface Window {
  gapi: {
    load: (api: string, callback: () => void) => void;
    client: {
      init: (config: {
        apiKey: string;
        clientId: string;
        discoveryDocs: string[];
        scope: string;
      }) => Promise<void>;
      calendar: {
        freebusy: {
          query: (params: {
            timeMin: string;
            timeMax: string;
            items: { id: string }[];
          }) => Promise<{
            result: {
              calendars: {
                [key: string]: {
                  busy: Array<{ start: string; end: string }>;
                };
              };
            };
          }>;
        };
        events: {
          insert: (params: {
            calendarId: string;
            resource: any;
          }) => Promise<any>;
        };
      };
    };
    auth2?: {
      getAuthInstance: () => {
        isSignedIn: {
          get: () => boolean;
        };
        signIn: () => Promise<any>;
        signOut: () => Promise<any>;
      };
    };
  };
} 