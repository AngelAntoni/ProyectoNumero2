export interface Consumer {
    consumer_id: string; // UUID generado automáticamente
    name: string;
    email?: string; // Puede ser nulo, por eso es opcional
    telephone?: string; // Puede ser nulo, por eso es opcional
    address?: string; // Puede ser nulo, por eso es opcional
  }