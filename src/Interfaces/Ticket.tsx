export interface Ticket {
    id: string; // UUID generado automáticamente
    sale_id?: string | null; // Puede ser nulo, por eso es opcional
    fecha_emision?: string | null; // Puede ser nulo, por eso es opcional
    contenido?: string | null; // Puede ser nulo, por eso es opcional
  }