import React from 'react';

// LVMH logo component
const NextLogo = ({ className = "logo-image" }) => {
  return (
    <div className={className} style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
      <img 
        src="/lvmh-logo.png"
        alt="LVMH" 
        style={{ 
          height: '50px', 
          width: 'auto', 
          maxWidth: '200px',
          objectFit: 'contain'
        }}
        onError={(e) => {
          // If image fails, show fallback text
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      
      {/* Text fallback - only shows if image fails to load */}
      <div 
        style={{ 
          display: 'none', 
          fontFamily: 'Playfair Display, Georgia, serif', 
          fontSize: '32px', 
          fontWeight: '400', 
          color: '#ffffff',
          letterSpacing: '0.1em'
        }}
      >
        LVMH
      </div>
    </div>
  );
};

export default NextLogo;
