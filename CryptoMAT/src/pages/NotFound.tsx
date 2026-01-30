import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Pagina non trovata</h1>
        <p className="error-description">
          AYOOO rallenta! La pagina che stai cercando non esiste.
          Potrebbe essere stata spostata o eliminata.
        </p>
        <div className="error-actions">
          <button onClick={() => navigate('/')} className="home-button">
            🏠 Vai alla Home
          </button>
          <button onClick={() => navigate(-1)} className="back-button-404">
            ← Torna Indietro
          </button>
        </div>
      </div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default NotFound;