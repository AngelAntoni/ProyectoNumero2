export interface Product {
    id: string; // UUID generado automáticamente
    product_name: string;
    product_description?: string | null; // Puede ser nulo, por eso es opcional
    product_price: number;
    deleted_at?: string | null; // Puede ser nulo, por eso es opcional
    created_at?: string | null; // Puede ser nulo, por eso es opcional
  }