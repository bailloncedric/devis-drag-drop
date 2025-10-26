
export interface Service {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
}

export interface QuoteItem extends Service {
  quantity: number;
}
