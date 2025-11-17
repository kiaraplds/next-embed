import { init, AuthType } from '@thoughtspot/visual-embed-sdk';
// SpotterAgentEmbed is imported in components that need it

// ThoughtSpot configuration
// Uses environment variables if available (for Vercel), otherwise uses default values
export const THOUGHTSPOT_CONFIG = {
  thoughtSpotHost: process.env.REACT_APP_THOUGHTSPOT_HOST || 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
  authType: AuthType.Basic,
  username: process.env.REACT_APP_THOUGHTSPOT_USERNAME || 'tsadmin',
  password: process.env.REACT_APP_THOUGHTSPOT_PASSWORD || 'Panepistimio7!!',
  // GUIDs
  liveboardId: process.env.REACT_APP_LIVEBOARD_ID || 'a52e6499-9b5a-4c85-91e2-19ff1a023d28',
  worksheetId: process.env.REACT_APP_WORKSHEET_ID || 'af200fe1-eade-47b8-92ec-fa20d72e7478'
};

// Initialize ThoughtSpot SDK
let isInitialized = false;

export const initializeThoughtSpot = async () => {
  if (!isInitialized) {
    try {
      await init({
        thoughtSpotHost: THOUGHTSPOT_CONFIG.thoughtSpotHost,
        authType: THOUGHTSPOT_CONFIG.authType,
        username: THOUGHTSPOT_CONFIG.username,
        password: THOUGHTSPOT_CONFIG.password,
        customizations: {
          style: {
            customCSS: {
              variables: {
                "--ts-var-root-background": "#FFFFFF",
                "--ts-var-nav-background": "#000000",
                "--ts-var-button--primary-background": "#000000",
                "--ts-var-button--primary-color": "#FFFFFF"
              }
            }
          },
              content: {
                strings: {
                  "Liveboard": "Dashboard",
                  "Answer": "Insights",
                  "Meet Spotter": "Spotter"
                }
              }
        }
      });
      isInitialized = true;
      console.log('ThoughtSpot SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ThoughtSpot SDK:', error);
      throw error;
    }
  }
  return isInitialized;
};
