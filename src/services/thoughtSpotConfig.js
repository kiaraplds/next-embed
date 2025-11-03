import { init, AuthType } from '@thoughtspot/visual-embed-sdk';
// SpotterAgentEmbed is imported in components that need it

// ThoughtSpot configuration
export const THOUGHTSPOT_CONFIG = {
  thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
  authType: AuthType.Basic,
  username: 'tsadmin',
  password: 'Panepistimio7!!',
  // GUIDs
  liveboardId: '2c3f4285-e6dc-442c-ae93-3f00ca7ebbee',
  worksheetId: '9fc22985-3aca-4ee7-b05e-921db27522f0'
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
                  "Meet Spotter": "NextQuestion"
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
