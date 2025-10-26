
import React from 'react';
import { QuoteItem } from '../types';
import { TrashIcon } from './Icons';

interface QuoteLineItemProps {
  item: QuoteItem;
  onUpdate: (id: string, updates: Partial<QuoteItem>) => void;
  onDelete: (id: string) => void;
}

const QuoteLineItem: React.FC<QuoteLineItemProps> = ({ item, onUpdate, onDelete }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onUpdate(item.id, { quantity: newQuantity });
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      onUpdate(item.id, { unitPrice: newPrice });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-slate-200 last:border-b-0">
        <div className="col-span-5">
            <p className="font-semibold text-slate-800">{item.name}</p>
            <p className="text-sm text-slate-500">{item.description}</p>
        </div>
        <div className="col-span-2">
            <input
                type="number"
                value={item.quantity}
                onChange={handleQuantityChange}
                className="w-full p-2 border border-slate-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
            />
        </div>
        <div className="col-span-2">
            <input
                type="number"
                value={item.unitPrice.toFixed(2)}
                onChange={handlePriceChange}
                className="w-full p-2 border border-slate-300 rounded-md text-right focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                step="0.01"
                min="0"
            />
        </div>
        <div className="col-span-2 text-right">
            <p className="font-semibold text-slate-800">{(item.quantity * item.unitPrice).toFixed(2)} €</p>
        </div>
        <div className="col-span-1 text-right">
            <button 
                onClick={() => onDelete(item.id)}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                aria-label="Supprimer l'élément"
            >
                <TrashIcon />
            </button>
        </div>
    </div>
  );
};

export default QuoteLineItem;
