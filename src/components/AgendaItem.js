import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function AgendaItem({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <p>
              <span className="font-semibold">Data:</span>{' '}
              {format(new Date(item.date), 'PPPPp', { locale: ptBR })}
            </p>
            {item.location && (
              <p>
                <span className="font-semibold">Local:</span> {item.location}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-500 hover:text-blue-700"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgendaItem;