import { fetchBooks } from '@/service/features/home'
import type { Book } from '@/types/home'
import type { GetServerSideProps } from 'next'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  books?: Book[]
}
const BooksSSR: FC<IProps> = memo(props => {
  const { books } = props;
  return <div>
    <div>BooksSSR</div>
    <ul>
      {books?.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </div>
})

BooksSSR.displayName = 'BooksSSR'

export default BooksSSR

// 这个函数，在每次用户访问页面时，回调
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context query:', context.query);
  const res = await fetchBooks(Number(context.query.count))
  return {
    props: {
      books: res.data.books
    }
  }
}
