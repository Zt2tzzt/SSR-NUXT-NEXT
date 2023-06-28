import { fetchBooks, fetchBooksDetail } from '@/service/features/home'
import type { Book } from '@/types/home'
import type { GetStaticPaths, GetStaticProps } from 'next'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  book?: Book
}
const BookDetailSSG: FC<IProps> = memo(props => {
  const { book } = props;
  return <div>
    <div>BookDetailSSG</div>
    <div>{book?.name}</div>
  </div>
})

BookDetailSSG.displayName = 'BookDetailSSG'

export default BookDetailSSG

export const getStaticPaths: GetStaticPaths = async () => {

  const res = await fetchBooks(5);
  const ids = res.data.books.map(item => ({
    params: {
      id: String(item.id)
    }
  }))
  return {
    paths: ids || [],
    fallback: false // 如果动态路由的路径，没有匹配上的，那么返回 404 页面
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('getStaticProps params:', context.params); // "0", "1", "2", "3", "4"

  const res = await fetchBooksDetail(context.params?.id as string)
  return {
    props: {
      book: res.data.book
    }
  }
}
