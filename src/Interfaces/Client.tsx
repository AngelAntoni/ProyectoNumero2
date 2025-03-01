export interface Client {
    client_id: string; // UUID generado automáticamente
    name: string;
    lastname: string;
    age?: number; // Puede ser nulo, por eso es opcional
    email: string;
    password: string;
    deleted_at?: string | null; // Puede ser nulo, por eso es opcional
    created_at?: string | null; // Puede ser nulo, por eso es opcional
  }