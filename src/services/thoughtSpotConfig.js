import { init, AuthType } from '@thoughtspot/visual-embed-sdk';
// SpotterAgentEmbed is imported in components that need it

// ThoughtSpot configuration
export const THOUGHTSPOT_CONFIG = {
  thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
  authType: AuthType.Basic,
  username: 'tsadmin',
  password: 'Panepistimio7!!',
  // GUIDs
  liveboardId: 'a52e6499-9b5a-4c85-91e2-19ff1a023d28',
  worksheetId: 'af200fe1-eade-47b8-92ec-fa20d72e7478'
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
                  "Meet Spotter": "Enlighter"
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
