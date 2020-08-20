export interface Book {
    id: number;
    title: string;
    author: string;
    publisher?: string;
    isbn10?: string;
    isbn13?: string;
    pageCount?: number;
    photoUrl: string;
}