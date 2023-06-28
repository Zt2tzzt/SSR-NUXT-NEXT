import { fetchBooks } from '@/service/features/home'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import type { Book } from '@/types/home'

interface IProps {
  children?: ReactNode
}
const BooksCSR: FC<IProps> = memo(props => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    // 在客户端获取数据
    const count = Math.floor(Math.random() * 10 + 1)

    fetchBooks(count).then(res => {
      console.log(res.data.books)
      setBooks(res.data.books)
    })
  }, [])

  return (
    <div>
      <div>BooksCSR</div>
      <ul>
        {books?.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
})

BooksCSR.displayName = 'BooksCSR'

export default BooksCSR
