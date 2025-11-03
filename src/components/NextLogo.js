import React from 'react';

// NEXT logo component - now uses the official NEXT SVG logo
const NextLogo = ({ className = "logo-image" }) => {
  return (
    <div className={className} style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
      <img 
        src="/next-logo.svg"
        alt="NEXT" 
        style={{ 
          height: '20px', 
          width: 'auto', 
          maxWidth: '120px',
          objectFit: 'contain'
        }}
        onError={(e) => {
          // If SVG fails, show fallback text
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      
      {/* Text fallback - only shows if SVG fails to load */}
      <div 
        style={{ 
          display: 'none', 
          fontFamily: 'Inter, sans-serif', 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#1a1a1a',
          letterSpacing: '2px'
        }}
      >
        NEXT
      </div>
    </div>
  );
};

export default NextLogo;
