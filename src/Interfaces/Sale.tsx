export interface Sale {
    id: string; // UUID generado automáticamente
    client_id?: string | null; // Puede ser nulo, por eso es opcional
    sale_date?: string | null; // Puede ser nulo, por eso es opcional
    total: number;
  }
  