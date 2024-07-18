export class CreateNoteDto {
    /**
   * DTO para crear una nueva nota.
   * Define los campos necesarios para crear una nota en la base de datos.
   */
    title: string;  // Título de la nota
    body: string;   // Cuerpo o contenido de la nota
    IdUser: bigint;  // ID del usuario dueño de la nota (como BigInt)
    isFavorite?: boolean;   // Indicador opcional de si la nota es favorita
}