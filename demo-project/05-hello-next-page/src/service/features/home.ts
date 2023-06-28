import type { BooksData, BookData } from '@/types/home'
import type { IResultData } from '@/types/global'
import { ztRequestSSG } from '..'

export const fetchBooks = (count = 5) =>
  ztRequestSSG.post<IResultData<BooksData>>({
    url: '/books',
    data: {
      page: 1,
      count
    }
  })

export const fetchBooksDetail = (id: string) =>
  ztRequestSSG.get<IResultData<BookData>>({
    url: '/book/' + id
  })
