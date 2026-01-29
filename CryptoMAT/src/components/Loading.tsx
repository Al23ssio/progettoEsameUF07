import './Loading.css';

export function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Caricamento in corso...</p>
    </div>
  );
}