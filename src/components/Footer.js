import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>🏀 Jersey Club CR</h3>
          <p>Tu tienda online de camisetas de calidad</p>
        </div>

        <div className="footer-section">
          <h3>Información</h3>
          <a href="#sobrenos">Sobre Nosotros</a>
          <a href="#politicas">Políticas de Privacidad</a>
          <a href="#terminos">Términos y Condiciones</a>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📧 info@jerseyclubcr.com</p>
          <p>📱 +506 XXXX-XXXX</p>
          <p>📍 Costa Rica</p>
        </div>

        <div className="footer-section">
          <h3>Síguenos</h3>
          <a href="#facebook">Facebook</a>
          <a href="#instagram">Instagram</a>
          <a href="#twitter">Twitter</a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #555' }}>
        <p>&copy; 2026 Jersey Club CR. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
