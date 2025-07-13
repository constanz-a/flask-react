import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1F3B4D', // azul oscuro
      color: '#f0f0f0',           // gris muy claro para texto general
      padding: '12px 20px',
      fontSize: '14px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <p style={{ margin: '0 0 6px 0', color: '#ff6600', fontWeight: 'bold' }}>
        &copy; 2025 Ferremas - Ferretería en Chile
      </p>
      <p style={{ margin: 0, color: '#cccccc' }}>
        Contacto: <a href="mailto:contacto@ferremas.cl" style={{ color: '#ff6600', textDecoration: 'none' }}>contacto@ferremas.cl</a> | Tel: +56 9 1234 5678 | Dirección: Av. Siempre Viva 123, Santiago
      </p>
    </footer>
  );
};

export default Footer;
