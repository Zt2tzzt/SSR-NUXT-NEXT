import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchSearchSuggest } from '@/stores/features/home'
import type { GetServerSideProps } from 'next'
import wrapper from '@/stores'
import { getProductSearchData } from '@/service/features/search'
import GridView from '@/components/grid-view'
import type { Product } from '@/types/product'
import classNames from "classnames";

interface IProps {
  children?: ReactNode
  products: Product[]
}
const Search: FC<IProps> = memo(props => {
  const { products } = props;

  return (
    <div className="search">
      <div className={classNames('wrapper')}>
        <GridView products={products}></GridView>
      </div>
    </div>
  )
})

Search.displayName = 'Search'

export default Search

// ssr
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async context => {
    // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
    await store.dispatch(fetchSearchSuggest())

    const { q } = context.query // 拿到 url 中查询字符串
    // 2.拿到 搜索页面的数据
    const res = await getProductSearchData({
      limit: 60,
      offset: 0,
      key: q as string
    })
    return {
      props: {
        products: res.products
      }
    }
  }
})
