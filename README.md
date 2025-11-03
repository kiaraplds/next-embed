# NEXT Brand Insights App ✨

An elegant, sophisticated React application that embeds ThoughtSpot analytics for NEXT retailers to provide comprehensive insights into their SKUs and product performance to brand partners. Features a refined black, white, and gold design with professional navigation and enterprise-grade UI perfect for luxury brand presentations.

## Features

### 📊 Analytics Integration
- **Dashboard Page**: ThoughtSpot Liveboard embedding for comprehensive product and SKU analytics
- **AI Assistant Page**: ThoughtSpot Spotter embedding for natural language queries about product data
- **Chat Bubble**: Floating AI assistant using SpotterAgentEmbed for conversational analytics
- **Secure Authentication**: Basic authentication integration with ThoughtSpot

### 🎨 Elegant Design
- **Sophisticated Color Palette**: Chic black, white, and gold hues for premium aesthetics
- **Left Sidebar Navigation**: Professional sidebar with categorized report access
- **Clean Minimalism**: Simplified design focusing on content and functionality
- **Subtle Interactions**: Refined hover effects and smooth transitions
- **Professional Typography**: Inter font family for crisp, modern text rendering

### 🚀 User Experience
- **NEXT-inspired Branding**: Sophisticated styling that reflects NEXT's luxury brand identity
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices  
- **Intuitive Navigation**: Left sidebar with organized access to different analytics reports
- **Floating Chat Assistant**: Always-available AI chat bubble for instant data queries
- **Clean Card Layout**: Minimalist white cards with elegant gold accents
- **Professional Interface**: Enterprise-grade UI suitable for brand partner presentations

## Technology Stack

- **React 18**: Modern React framework with hooks and functional components
- **React Router**: Client-side routing for navigation between pages
- **ThoughtSpot Visual Embed SDK**: Official SDK for embedding ThoughtSpot analytics
- **CSS3**: Custom styling with responsive design principles

## Prerequisites

Before running this application, ensure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager
- Access to the ThoughtSpot cluster at `https://se-thoughtspot-cloud.thoughtspot.cloud/`
- Valid ThoughtSpot credentials (username: `tsadmin`, password: `Panepistimio7!!`)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd NEXT_Embed
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Configuration

The ThoughtSpot configuration is located in `src/services/thoughtSpotConfig.js`. Update the following if needed:

```javascript
export const THOUGHTSPOT_CONFIG = {
  thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
  authType: AuthType.Basic,
  username: 'tsadmin',
  password: 'Panepistimio7!!',
  liveboardId: '6d3e5644-60c0-4f02-b04d-bb2490bbb632',
  worksheetId: '782b50d1-fe89-4fee-812f-b5f9eb0a552d'
};
```

## Usage

### Dashboard Page (`/liveboard`)
- View comprehensive product and SKU performance metrics
- Interactive charts and visualizations
- Real-time data updates from ThoughtSpot

### AI Assistant Page (`/spotter`)
- Ask natural language questions about your data
- Examples:
  - "Show me top selling products by region"
  - "What's our inventory turnover rate?"
  - "Which SKUs have the highest margins?"

### Floating Chat Assistant
- **Always Available**: Click the chat bubble (💬) in the bottom-right corner
- **Conversational Interface**: Modern chat UI with message history
- **Quick Prompts**: Pre-defined example queries to get started
- **Real-time Responses**: Instant ThoughtSpot visualizations within chat
- **Mobile Friendly**: Responsive chat interface for all devices

## Project Structure

```
src/
├── components/
│   ├── Layout.js          # Main layout with navigation and chat
│   ├── Layout.css         # Layout styling
│   ├── Sidebar.js         # Left navigation sidebar
│   ├── Sidebar.css        # Sidebar styling
│   ├── ChatBubble.js      # Floating chat assistant component
│   ├── ChatBubble.css     # Chat bubble styling
│   ├── ChatToggle.js      # Chat toggle button
│   ├── ChatToggle.css     # Chat toggle styling
│   ├── NextLogo.js        # NEXT logo component
│   └── NextLogo.css       # Logo styling
├── pages/
│   ├── LiveboardPage.js   # Dashboard page component
│   ├── LiveboardPage.css  # Dashboard styling
│   ├── SpotterPage.js     # AI Assistant page component
│   ├── SpotterPage.css    # AI Assistant styling
│   ├── ComingSoonPage.js  # Coming soon placeholder
│   └── ComingSoonPage.css # Coming soon styling
├── services/
│   └── thoughtSpotConfig.js # ThoughtSpot configuration
├── App.js                 # Main App component with routing
├── App.css               # Global styles
└── index.js              # Application entry point
```

## Customization

### Branding
The application uses NEXT's black and white color scheme. Customize colors in:
- `src/components/Layout.css` for navigation
- `src/App.css` for global styles
- `src/services/thoughtSpotConfig.js` for ThoughtSpot theme variables

### ThoughtSpot Customization
The app includes custom ThoughtSpot configurations:
- Custom CSS variables for consistent branding
- Action controls for embedded interfaces
- Localization settings (en-GB)

## Troubleshooting

### Common Issues

1. **Blank screen or loading issues**:
   - Verify ThoughtSpot host URL is correct
   - Check network connectivity to ThoughtSpot cluster
   - Ensure credentials are valid

2. **Authentication errors**:
   - Confirm username and password in configuration
   - Check if ThoughtSpot cluster is accessible

3. **CORS/CSP errors**:
   - Ensure your domain is added to ThoughtSpot's allowlist
   - Contact ThoughtSpot administrator to update security settings

## Development

### Available Scripts

- `npm start`: Start development server
- `npm build`: Create production build
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App (not recommended)

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Support

For technical issues or questions:
- Check ThoughtSpot Developer Documentation: https://developers.thoughtspot.com/
- Review Visual Embed SDK documentation
- Contact your ThoughtSpot administrator

## License

This project is proprietary to NEXT Retail Ltd.
