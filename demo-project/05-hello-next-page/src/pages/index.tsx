import { Inter } from 'next/font/google'
import MyButton from '@/components/MuButton'
import styles from './index.module.scss';

import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image';

import userImage from '@/assets/images/user.png';

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
      {/* <Script src="http://codercba.com"></Script> */}

      <div>Hello Next</div>
      <MyButton></MyButton>
      <div>baseUrl: {process.env.NEXT_PUBLIC_BASE_URL}</div>

      <h2>全局样式</h2>
      <div className="global-style">全局样式测试</div>
      <div className="global-style2">全局样式测试</div>

      <h2>局部样式</h2>
      <div className={styles['local-style']}>局部样式测试</div>

      <h2>scss 导出的样式</h2>
      <div style={{color: styles.primaryColor}}>scss 导出的的样式测试</div>

      <h2>public 静态资源</h2>
      <Image src="/feel.png" alt="feel" width={140} height={140}priority></Image>
      <div className={styles["box-bg1"]}></div>

      <h2>assets 静态资源</h2>
      <Image src={userImage} alt="userImg" width={140} height={140}></Image>
      <div className={styles["box-bg2"]}></div>

      <h2>字体图标</h2>
      <i className='iconfont icon-bianji'></i>
    </>
  )
}

Home.displayName = 'Home'
