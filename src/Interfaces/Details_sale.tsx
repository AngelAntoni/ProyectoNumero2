export interface DetailsSale {
    id: string; // UUID generado automáticamente
    sale_id?: string | null; // Puede ser nulo, por eso es opcional
    product_id?: string | null; // Puede ser nulo, por eso es opcional
    amount: number;
    unit_price: number;
    subtotal: number;
  } 