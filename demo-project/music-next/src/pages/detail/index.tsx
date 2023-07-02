import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { GetServerSideProps } from 'next'
import wrapper from '@/stores'
import { fetchSearchSuggest } from '@/stores/features/home'
import { getDetailProductInfo } from '@/service/features/detail'
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";
import classNames from "classnames";
import GridView from '@/components/grid-view';
import type { DetailProductInfo } from '@/types/product'

interface IProps {
  children?: ReactNode
  detailData: DetailProductInfo
}
const Detail: FC<IProps> = memo(props => {
  const { detailData } = props;
  
  return (
    <div className={styles.detail}>
      <div className={classNames('wrapper', styles.content)}>
        {/* 图片 */}
        <div className={styles.banner}>
          <Link href={'/'}>
            <Image className={styles.image} src={detailData?.webPic!} alt="air" fill></Image>
          </Link>
        </div>

        {/* 商品列表 */}
        <GridView products={detailData.products}></GridView>
      </div>
    </div>
  )
})

Detail.displayName = 'Detail'

export default Detail

// ssr
// getServerSideProps 是在服务器端运行
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async context => {
    // 1.触发一个异步的action来发起网络请求, 拿到搜索建议并存到redex中
    await store.dispatch(fetchSearchSuggest())

    const { id } = context.query // 拿到 url中查询字符串
    // 2.拿到详情页面的数据
    const res = await getDetailProductInfo(Number(id))
    return {
      props: {
        detailData: res.data
      }
    }
  }
})
