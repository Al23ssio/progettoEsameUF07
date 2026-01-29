import './ErrorMessage.css';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = 'Si è verificato un errore' }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Errore</h2>
      <p>{message}</p>
    </div>
  );
}