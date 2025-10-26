import React, { useState, useMemo, useRef } from 'react';
import { QuoteItem } from '../types';
import QuoteLineItem from './QuoteLineItem';
import { TAX_RATE } from '../constants';
import { PlusCircleIcon, TrashIcon } from './Icons';

interface QuoteCanvasProps {
  items: QuoteItem[];
  onDropItem: (serviceId: string) => void;
  onUpdateItem: (id: string, updates: Partial<QuoteItem>) => void;
  onDeleteItem: (id: string) => void;
  logo: string | null;
  onSetLogo: (dataUrl: string) => void;
  onRemoveLogo: () => void;
}

const QuoteCanvas: React.FC<QuoteCanvasProps> = ({ items, onDropItem, onUpdateItem, onDeleteItem, logo, onSetLogo, onRemoveLogo }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const serviceId = e.dataTransfer.getData('serviceId');
    if (serviceId) {
      onDropItem(serviceId);
    }
  };
  
  const { subtotal, taxAmount, total } = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const taxAmount = subtotal * TAX_RATE;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }, [items]);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSetLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveLogo();
  }
  
  return (
    <main 
      className="w-full lg:w-2/3 xl:w-3/4 p-6 md:p-8 lg:p-12"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="print-area max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start pb-8 border-b border-slate-200">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">DEVIS</h1>
              <input type="text" defaultValue="INV-2024-001" className="text-slate-500 mt-2 p-2 w-48 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            
            <div className="flex items-start justify-end">
              <input 
                type="file" 
                ref={logoInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/png, image/jpeg, image/gif" 
              />
              {logo ? (
                <div className="relative group">
                  <img 
                    src={logo} 
                    alt="Logo de l'entreprise" 
                    className="max-w-[160px] max-h-24 object-contain cursor-pointer"
                    onClick={handleLogoClick}
                  />
                  <button
                    onClick={handleRemoveLogoClick}
                    className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 no-print"
                    aria-label="Supprimer le logo"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={handleLogoClick} 
                  className="w-40 h-24 bg-slate-100 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center text-center text-slate-500 text-sm cursor-pointer hover:bg-slate-200 hover:border-slate-400 transition-colors"
                >
                  Ajouter votre logo
                </div>
              )}
            </div>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div>
              <h2 className="font-semibold text-slate-600 mb-2">De:</h2>
              <textarea defaultValue="Toitures Express&#10;123 Rue des Charpentiers&#10;75000 Paris, France" rows={4} className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-slate-800"></textarea>
            </div>
            <div className="md:text-right">
              <h2 className="font-semibold text-slate-600 mb-2">Pour:</h2>
              <textarea defaultValue="Nom du Client&#10;Son Entreprise&#10;456 Avenue du Projet&#10;69000 Lyon, France" rows={4} className="w-full p-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-slate-800 md:text-right"></textarea>
            </div>
          </div>
          
          {/* Items Header */}
          <div className="grid grid-cols-12 gap-4 pb-2 border-b-2 border-slate-300 font-bold text-slate-600 text-sm">
              <div className="col-span-5">DESCRIPTION</div>
              <div className="col-span-2 text-center">QTÉ</div>
              <div className="col-span-2 text-right">PRIX U.</div>
              <div className="col-span-2 text-right">TOTAL</div>
              <div className="col-span-1"></div>
          </div>

          {/* Items List */}
          <div id="quote-items">
              {items.map(item => (
                <QuoteLineItem key={item.id} item={item} onUpdate={onUpdateItem} onDelete={onDeleteItem} />
              ))}
          </div>

          {/* Drop Area */}
          {items.length === 0 && (
             <div className={`my-4 p-8 text-center border-2 border-dashed rounded-lg ${isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300'}`}>
                <PlusCircleIcon className="mx-auto h-12 w-12 text-slate-400"/>
                <p className="mt-4 text-sm font-semibold text-slate-900">Déposez un service ici</p>
                <p className="mt-1 text-sm text-slate-500">Ou continuez à glisser depuis le panneau de gauche</p>
            </div>
          )}

          {/* Totals */}
          <div className="flex justify-end mt-12">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Sous-total</span>
                <span className="font-semibold text-slate-800">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">TVA ({TAX_RATE * 100}%)</span>
                <span className="font-semibold text-slate-800">{taxAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-4 bg-slate-100 -mx-4 px-4 mt-2 rounded-md">
                <span className="font-bold text-slate-800 text-lg">Total</span>
                <span className="font-bold text-indigo-600 text-lg">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="font-semibold text-slate-600 mb-2">Notes</h3>
            <p className="text-sm text-slate-500">Merci pour votre confiance. Ce devis est valable 30 jours.</p>
          </div>
      </div>
    </main>
  );
};

export default QuoteCanvas;