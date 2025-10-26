import React, { useState } from 'react';
import { Service } from '../types';

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (service: Omit<Service, 'id'>) => void;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(unitPrice);
    if (!name.trim() || !description.trim() || isNaN(price) || price <= 0) {
      setError('Veuillez remplir tous les champs correctement. Le prix doit être un nombre positif.');
      return;
    }
    onCreate({
      name,
      description,
      unitPrice: price,
    });
    // Reset form
    setName('');
    setDescription('');
    setUnitPrice('');
    setError('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center no-print"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Créer un nouveau service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="service-name" className="block text-sm font-medium text-slate-700">Nom du service</label>
            <input
              type="text"
              id="service-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ex: Remplacement de gouttières"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="service-description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              id="service-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ex: Fourniture et pose de gouttières en zinc."
            />
          </div>
          <div className="mb-6">
            <label htmlFor="service-price" className="block text-sm font-medium text-slate-700">Prix Unitaire (€)</label>
            <input
              type="number"
              id="service-price"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ex: 45"
              step="0.01"
              min="0"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Créer le service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
