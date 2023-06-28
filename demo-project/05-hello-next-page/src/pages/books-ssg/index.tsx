import { fetchBooks } from '@/service/features/home'
import type { Book } from '@/types/home'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  books?: Book[]
}
const BooksSSG: FC<IProps> = memo(props => {
  const { books } = props

  return (
    <div>
      <div>BooksSSG</div>
      <ul>
        {books?.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
})

BooksSSG.displayName = 'BooksSSG'

export default BooksSSG

// 在 build 构建时，会执行一次。
export async function getStaticProps() {
  const count = Math.floor(Math.random() * 10 + 1)
  console.log('count:', count)

  const res = await fetchBooks(count)
  
  return {
    props: {
      books: res.data.books
    }
  }
}
