export interface BooksData {
  books: Book[]
}

export interface BookData {
  book: Book
}

export interface Book {
  name: string
  id: number
  descp: string
  price: number
  count: number
}