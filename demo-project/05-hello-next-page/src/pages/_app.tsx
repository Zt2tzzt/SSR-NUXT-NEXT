import '@/styles/globals.css'
import '@/styles/main.scss'
import '@/assets/font/iconfont.css'
import type { AppProps } from 'next/app'
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  console.log('Component Name:', Component.displayName);
  
  return (
    <div>
      <div className="router-link">
        <Link href="/">
          <button>home</button>
        </Link>

        <Link href="/category">
          <button>category</button>
        </Link>

        <Link href={{
          pathname: '/cart',
          query: {
            count: 100
          }
        }}>
          <button>cart</button>
        </Link>

        {/* 外部地址 */}
        <Link href="https://www.jd.com" target='_blank'>
          <button>category</button>
        </Link>

        {/* as: 是给路径 起一个 别名 */}
        <Link href="/profile" as="profile_v2">
          <button>profile</button>
        </Link>

        {/* replace */}
        <Link href="/more" replace>
          <button>more replace</button>
        </Link>
        
      </div>

      <Component {...pageProps} />
    </div>
  
  )
}
