export class CreateNoteDto {
    title: string;
    body: string;
    IdUser: bigint;  
    isFavorite?: boolean;
}