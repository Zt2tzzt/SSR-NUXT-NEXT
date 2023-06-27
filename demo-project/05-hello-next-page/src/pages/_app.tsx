import '@/styles/globals.css'
import '@/styles/main.scss'
import '@/assets/font/iconfont.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { NextPage } from 'next'
import type { ReactElement } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
}
type AppPropWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, pageProps }: AppPropWithLayout) {
  const cn = Component.displayName
  console.log('Component Name:', cn)

  const router = useRouter()
  const onFindClick = () => {
    // router.push('/find')

    /* router.push({
      pathname: '/find',
      query: {
        id: 1000,
      }
    }) */

    // router.push('https://www.jd.com')

    // 区别名
    router.push('/find?id=1000', 'find_v2')
  }

  useEffect(() => {
    const handleRouterChangeStart = (url: string) => {
      console.log('routeChangeStart:', url)
    }
    const handleRouterChangeComplete = (url: string) => {
      console.log('routeChangeComplete:', url)
    }

    router.events.on('routeChangeStart', handleRouterChangeStart)
    router.events.on('routeChangeComplete', handleRouterChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart)
      router.events.off('routeChangeComplete', handleRouterChangeComplete)
    }
  })

  let getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  return (
    <div>
      <div className="router-link">
        <Link href="/">
          <button>home</button>
        </Link>

        <Link href="/category">
          <button>category</button>
        </Link>

        <Link
          href={{
            pathname: '/cart',
            query: {
              count: 100
            }
          }}
        >
          <button>cart</button>
        </Link>

        {/* 外部地址 */}
        <Link href="https://www.jd.com" target="_blank">
          <button>category</button>
        </Link>

        {/* as: 是给路径 起一个 别名 */}
        <Link href="/profile">
          <button>profile</button>
        </Link>

        {/* replace */}
        <Link href="/more" replace>
          <button>more replace</button>
        </Link>

        <h2>编程导航</h2>
        <button onClick={() => onFindClick()}>find</button>
        <button onClick={() => router.back()}>返回</button>

        <h2>动态路由</h2>
        {/* 一级动态路由 */}
        <Link href="/detail01/666" replace>
          <button>detail01/666</button>
        </Link>

        {/* 二级动态路由 */}
        <Link href="/detail02/admin/233" replace>
          <button>detail02/admin/233</button>
        </Link>

        <h2>生命周期</h2>
        <Link href={'/lifecycle-class'}>
          <button>lifecycle-class</button>
        </Link>
        <Link href={'/lifecycle-func'}>
          <button>lifecycle-func</button>
        </Link>

        <h2>网络请求</h2>
        <Link href="/fetch">
          <button>fetch</button>
        </Link>
      </div>

      {/* {cn === 'Cart' ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : cn === 'Profile' ? (
        <ProfileLayout>
          <Component {...pageProps} />
        </ProfileLayout>
      ) : (
        <Component {...pageProps} />
      )} */}

      {getLayout(<Component {...pageProps} />)}
    </div>
  )
}
