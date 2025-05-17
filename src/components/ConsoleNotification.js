// src/components/ConsoleNotification.js
import { useEffect } from 'react';
import './ConsoleNotification.css';

const ConsoleNotification = () => {
  useEffect(() => {
    const originalConsoleError = console.error;
    
    console.error = (message) => {
      originalConsoleError(message); // Mantém o log original no console
      
      // Cria a notificação na tela
      const notification = document.createElement('div');
      notification.className = 'console-notification error';
      notification.textContent = typeof message === 'string' ? message : 'Ocorreu um erro';
      
      document.body.appendChild(notification);
      
      // Remove após 5 segundos
      setTimeout(() => {
        notification.remove();
      }, 5000);
    };

    return () => {
      console.error = originalConsoleError; // Restaura o console.error original
    };
  }, []);

  return null;
};

export default ConsoleNotification;