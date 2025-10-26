import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import QuoteCanvas from './components/QuoteCanvas';
import CreateServiceModal from './components/CreateServiceModal';
import { AVAILABLE_SERVICES } from './constants';
import { QuoteItem, Service } from './types';
import { v4 as uuidv4 } from 'uuid'; // Let's use uuid to handle multiple drops of the same item

// A simple mock for uuid since we can't add libraries.
const simpleUuid = () => 'id-' + Math.random().toString(36).substr(2, 9);


const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>(AVAILABLE_SERVICES);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const handleDropItem = useCallback((serviceId: string) => {
    const serviceToAdd = services.find(s => s.id === serviceId);
    if (serviceToAdd) {
      setQuoteItems(prevItems => [
        ...prevItems,
        { ...serviceToAdd, id: simpleUuid(), quantity: 1 } // Give a unique id to each line item
      ]);
    }
  }, [services]);

  const handleUpdateItem = useCallback((id: string, updates: Partial<QuoteItem>) => {
    setQuoteItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    setQuoteItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const handleCreateService = useCallback((newServiceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...newServiceData,
      id: 'custom-' + Math.random().toString(36).substr(2, 9),
    };
    setServices(prevServices => [newService, ...prevServices]);
    setIsCreateModalOpen(false);
  }, []);
  
  const handleDeleteService = useCallback((id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.")) {
      setServices(prevServices => prevServices.filter(service => service.id !== id));
    }
  }, []);

  const handleSetLogo = useCallback((dataUrl: string) => {
    setLogo(dataUrl);
  }, []);

  const handleRemoveLogo = useCallback(() => {
    setLogo(null);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen font-sans">
        <header className="absolute top-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex justify-between items-center z-10 no-print">
          <h1 className="text-xl font-bold text-slate-800">Générateur de Devis</h1>
          <button 
            onClick={() => window.print()}
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Imprimer / PDF
          </button>
        </header>

        <div className="flex flex-col lg:flex-row w-full pt-16">
          <Sidebar 
            services={services} 
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onDeleteService={handleDeleteService}
          />
          <QuoteCanvas 
            items={quoteItems}
            onDropItem={handleDropItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            logo={logo}
            onSetLogo={handleSetLogo}
            onRemoveLogo={handleRemoveLogo}
          />
        </div>
      </div>
      <CreateServiceModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateService}
      />
    </>
  );
};

export default App;