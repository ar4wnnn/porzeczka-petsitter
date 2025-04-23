// Custom type definitions for Google API
interface GoogleApiClient {
  calendar: {
    freebusy: {
      query: (params: any) => Promise<any>;
    };
    events: {
      insert: (params: any) => Promise<any>;
    };
  };
}

interface GoogleApi {
  load: (api: string, callback: () => void) => void;
  client: GoogleApiClient;
  auth2?: any;
}

interface Window {
  gapi: GoogleApi;
} 