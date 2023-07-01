import { type FC, memo } from 'react'
import wrapper from '@/stores'
import styles from './index.module.scss'
import { fetchSearchSuggest } from '@/stores/features/home'
import type { GetServerSideProps } from 'next'
// import { Inter } from 'next/font/google'
import type { Banner, Category, Recommend, DigitalData } from '@/types/home'
import { HotProduct } from '@/types/product';
import { getHomeInfo, getProductInfo } from '@/service/features/home'
import TopSwiper from '@/components/top-swiper'
import TabCategory from '@/components/tab-category'
import RecommendCpn from '@/components/recommend'
import classNames from 'classnames'
import SectionTitle from '@/components/section-title'
import GridView from '@/components/grid-view'

// const inter = Inter({ subsets: ['latin'] })

interface IProps {
  banners: Banner[]
  categorys: Category[]
  recommends: Recommend[]
  hotProducts: HotProduct[]
}
const Home: FC<IProps> = memo(props => {
  const { banners, categorys, recommends, hotProducts } = props

  return (
    <>
      <div className={styles.home}>
        <TopSwiper banners={banners}></TopSwiper>
        <TabCategory categorys={categorys}></TabCategory>
        <RecommendCpn recommends={recommends}></RecommendCpn>
        {/* 商品区域 */}
        <div className={classNames('wrapper', styles['content'])}>
          <SectionTitle title="商品推荐"></SectionTitle>
          <GridView products={hotProducts}></GridView>
        </div>
      </div>
    </>
  )
})

Home.displayName = 'Home'
export default Home

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    // 1.派发异步 action 来发起请求，拿到搜索建议，并存到 redux 中
    await store.dispatch(fetchSearchSuggest())

    // 2.发送网络请求，获取主页信息。
    // 3.发送网络请求，获取商品数据

    const [homeinfo, productinfo] = await Promise.all([getHomeInfo(), getProductInfo()])
    return {
      props: {
        banners: homeinfo.data.banners,
        categorys: homeinfo.data.categorys,
        recommends: homeinfo.data.recommends,
        hotProducts: productinfo.data.hotProduct,
      }
    }
  }
})
