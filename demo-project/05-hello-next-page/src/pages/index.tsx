import { Inter } from 'next/font/google'
import MyButton from '@/components/MuButton'

import Head from 'next/head'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  if (typeof window === 'object') {
    console.log('client~')
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
  } else {
    console.log('server~')
    console.log(process.env.NAME)
    console.log(process.env.AGE)
  }

  return (
    <>
      {/* 做 SEO 和添加外部的资源 */}
      <Head>
        {/* html的标签 */}
        <title>我是Title</title>
        <meta name="description" content="网易云音乐商城"></meta>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      
      {/* 给 home 首页的 body 插入一个 script 标签 */}
      <Script src="http://codercba.com"></Script>

      <div>Hello Next</div>
      <MyButton></MyButton>
      <div>baseUrl: {process.env.NEXT_PUBLIC_BASE_URL}</div>
    </>
  )
}
