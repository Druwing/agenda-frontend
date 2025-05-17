// src/components/ConsoleNotification.js
import { useEffect } from 'react';
import './ConsoleNotification.css';

const ConsoleNotification = () => {
  useEffect(() => {
    const originalConsole = {
      error: console.error,
      log: console.log
    };
    
    // Sobrescreve console.error para notificações vermelhas
    console.error = (message) => {
      originalConsole.error(message);
      showNotification(message, 'error');
    };
    
    // Sobrescreve console.log para notificações verdes
    console.log = (message) => {
      originalConsole.log(message);
      if (typeof message === 'string' && message.toLowerCase().includes('sucesso')) {
        showNotification(message, 'success');
      }
    };

    const showNotification = (message, type) => {
      const notification = document.createElement('div');
      notification.className = `console-notification ${type}`;
      
      // Formata a mensagem para remover [object Object] se necessário
      const displayMessage = typeof message === 'string' 
        ? message 
        : (message.message || 'Operação concluída com sucesso');
      
      notification.textContent = displayMessage;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 5000);
    };

    return () => {
      console.error = originalConsole.error;
      console.log = originalConsole.log;
    };
  }, []);

  return null;
};

export default ConsoleNotification;