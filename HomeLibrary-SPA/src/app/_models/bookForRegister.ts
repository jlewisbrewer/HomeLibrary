export interface BookForRegister
{
    title: string;
    author: string;
    publisher: string;
    description: string;
    isbn10?: string;
    isbn13?: string;
    pageCount?: number;
    photoUrl: string;
}