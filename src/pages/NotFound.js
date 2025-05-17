import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          A página que você está procurando pode ter sido removida ou não está disponível no momento.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

export default NotFound;