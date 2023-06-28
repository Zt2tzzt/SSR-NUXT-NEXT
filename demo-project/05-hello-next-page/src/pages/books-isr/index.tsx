import { fetchBooks } from '@/service/features/home'
import type { Book } from '@/types/home'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  books: Book[]
}
const BooksISR: FC<IProps> = memo(props => {
  const { books } = props;
  return (
    <div>
      <div>BooksISR</div>
      <ul>
        {books?.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
})

BooksISR.displayName = 'BooksISR'

export default BooksISR

export async function getStaticProps() {
  const count = Math.floor(Math.random() * 10 + 1)
  console.log('count:', count)

  const res = await fetchBooks(count)
  
  return {
    props: {
      books: res.data.books
    },
    revalidate: 5 // 每间隔 5s 动态生成新的静态页面
  }
}
