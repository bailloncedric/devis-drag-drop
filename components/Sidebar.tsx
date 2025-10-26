import React from 'react';
import { Service } from '../types';
import ServiceItem from './ServiceItem';

interface SidebarProps {
  services: Service[];
  onOpenCreateModal: () => void;
  onDeleteService: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ services, onOpenCreateModal, onDeleteService }) => {
  return (
    <aside className="w-full lg:w-1/3 xl:w-1/4 p-6 bg-slate-50 border-r border-slate-200 overflow-y-auto no-print">
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Services Disponibles</h2>
      <p className="text-slate-500 mb-6">Glissez-déposez un service sur le devis.</p>
      
      <button
        onClick={onOpenCreateModal}
        className="w-full bg-indigo-500 text-white font-semibold px-4 py-3 rounded-md hover:bg-indigo-600 transition-colors duration-200 mb-6 text-center flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Créer un service
      </button>

      <div>
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} onDelete={onDeleteService} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;