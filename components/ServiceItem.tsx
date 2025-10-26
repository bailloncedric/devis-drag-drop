import React from 'react';
import { Service } from '../types';
import { GrabIcon, TrashIcon } from './Icons';

interface ServiceItemProps {
  service: Service;
  onDelete: (id: string) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onDelete }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('serviceId', service.id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents drag-and-drop from starting on button click
    onDelete(service.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group relative p-3 mb-3 bg-white border border-slate-200 rounded-lg shadow-sm cursor-grab active:cursor-grabbing flex items-center justify-between hover:shadow-md transition-shadow duration-200"
    >
        <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            aria-label="Supprimer le service"
        >
            <TrashIcon className="h-4 w-4" />
        </button>
        <div>
            <h3 className="font-semibold text-slate-800 pr-8">{service.name}</h3>
            <p className="text-sm text-slate-500">{service.description}</p>
            <p className="text-sm font-bold text-indigo-600 mt-1">{service.unitPrice.toFixed(2)} €</p>
        </div>
        <GrabIcon />
    </div>
  );
};

export default ServiceItem;