编程导航。



在 _app.tsx 中，跳转 find 页面。

src\pages\_app.tsx

```tsx
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  console.log('Component Name:', Component.displayName);
  
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
    router.push('/find?id=1000','find_v2')
  }
  return (
    <div>
      <div className="router-link">
        <h2>编程导航</h2>
        <button onClick={() => onFindClick()}>find</button>

        <button onClick={() => router.back()}>返回</button>
      </div>

      <Component {...pageProps} />
    </div>
  
  )
}
```

客户端路由的监听

在 useEffects 中，进行监听。

全局的路由监听，一般写在 _app.tsx 中。

src\pages\_app.tsx

```tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouterChangeStart = (url: string) => {
      console.log('routeChangeStart:', url);
    }
    const handleRouterChangeComplete = (url: string) => {
      console.log('routeChangeComplete:', url);
    }

    router.events.on('routeChangeStart', handleRouterChangeStart)
    router.events.on('routeChangeComplete', handleRouterChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart)
      router.events.off('routeChangeComplete', handleRouterChangeComplete)
    }

  })
}
```

---

动态路由

新建 detail01、detail02 页面，测试一级，二级动态路由。

src\pages\_app.tsx

```tsx
{/* 一级动态路由 */}
<Link href="/detail01/666" replace>
  <button>detail01/666</button>
</Link>

{/* 二级动态路由 */}
<Link href="/detail02/admin/233" replace>
  <button>detail02/admin/233</button>
</Link>
```

src\pages\detail01\[id].tsx

```tsx
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail01: FC<IProps> = memo(props => {
  const router = useRouter()
  console.log('router.query:', router.query); // 没有 params 属性，
  // query 既可以拿到查询字符串，也可以拿到动态路由的 params，如果重复，取动态路由的 params

  const { id } = router.query;
  console.log('id:', id);
  

  return <div>Detail01</div>
})

Detail01.displayName = 'Detail01'

export default Detail01
```

src\pages\detail02\[role]\[id].tsx

```tsx
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail02: FC<IProps> = memo(props => {
  const router = useRouter()
  const { role, id } = router.query;
  console.log('role:', role, 'id:', id);
  

  return <div>Detail02</div>
})

Detail02.displayName = 'Detail02'

export default Detail02
```

---

404 page

编写全局 404 page

在 `/pages` 目录下，创建 [...slug].tsx 或 404.tsx（也可创建 500.tsx，用于处理服务器报错）

src\pages\[...slug].tsx

```tsx
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const NotFound: FC<IProps> = memo(props => {
  const router = useRouter()
  const { slug } = router.query
  console.log('slug:', slug);
  
  return <div>404 Not Found ~</div>
})

NotFound.displayName = 'NotFound'

export default NotFound
```



编写局部 404 page。

在 `/detail03` 下，创建 `[...slug].vue` 文件

在其中拿到 slug 参数。

src\pages\detail03\[...slug].tsx

```tsx
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail03NotFound: FC<IProps> = memo(props => {
    const router = useRouter()
  const { slug } = router.query
  console.log('slug:', slug);

  return <div>404 Detail03 Not Found ~</div>
})

Detail03NotFound.displayName = 'Detail03NotFound'

export default Detail03NotFound
```



---

路由匹配规则总结

---

中间件



在根目录，创建 `/src/middleware.ts` 文件，

src\middleware.ts

```typescript
import { NextRequest } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req:NextRequest) {
  console.log('req.url:', req.url)
}

// req.url: http://localhost:3000/_next/image?url=%2Ffeel.png&w=256&q=75
// req.url: http://localhost:3000/_next/static/chunks/webpack.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/chunks/react-refresh.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/chunks/main.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/chunks/pages/_app.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/chunks/pages/index.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/development/_buildManifest.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/development/_ssgManifest.js?ts=1687680114587
// req.url: http://localhost:3000/_next/static/development/_devMiddlewareManifest.json
```



匹配器：

编写匹配器：

src\middleware.ts

```typescript
import { NextRequest } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req:NextRequest) {
  console.log('req.url:', req.url)
}

// 匹配器，用于过滤
export const config = {
  // (?!_next)  匹配不包含 _next 路径
  matcher: ["/((?!_next/static|api|favicon.ico).*)"],
};

// req.url: http://localhost:3000/_next/image?url=%2Ffeel.png&w=256&q=75
// req.url: http://localhost:3000/feel.png
```



路由拦截

1.放行请求

src\middleware.ts

```typescript
import { NextRequest, NextResponse } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req:NextRequest) {
  // 2.返回 next()
  return NextResponse.next(); // 和没有返回值的效果是一样，放行请求
}
```

2.请求重定向。

src\middleware.ts

```typescript
import { NextResponse } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req:NextRequest) {
  console.log('req:', req)

  // 3.返回的 重定向
  const token = req.cookies.get("token")?.value;
  if (!token && req.nextUrl.pathname !== "/login") {
    // 重定向到登录页面
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
}
```

安装 cookies-nest 依赖。

```shell
pnpm add cookies-nest
```

src\pages\login.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { setCookies } from 'cookies-next'

interface IProps {
  children?: ReactNode
}
const Login: FC<IProps> = memo(props => {
  const onLoginClick = () => {
    setCookies('token', 'aabbcc', {
      maxAge: 10
    })
  }

  return (
    <div>
      <h3>login</h3>
      <button onClick={() => onLoginClick()}>login</button>
    </div>
  )
})

Login.displayName = 'Login'

export default Login
```

3.重写请求。

安装 axios 库

```shell
pnpm add axios
```

在 index.vue 中，发送网络请求。

src\pages\index.tsx

```tsx
import { Inter } from 'next/font/google'
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  function onGetJuanpiDataClick() {
    axios.get('http://localhost:3000/api/homeInfo').then(res => {
      console.log('index res:', res);
    })
  }

  return (
    <>
      <h2>中间件</h2>
      <button onClick={() => onGetJuanpiDataClick()}>get juanpi data</button>
    </>
  )
}

Home.displayName = 'Home'
```

重写网络请求的域名，防止跨域。

src\middleware.ts

```typescript
import { NextResponse } from 'next/server'

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req: NextRequest) {
  // 4.返回的 重写 ->  vue.config  devServer-> proxy
  if (req.nextUrl.pathname.startsWith('/juanpi/api')) {
    // http://locahost:3000/juanpi/api/homeInfo?id=100
    // 重写 url 为下面的 url
    // http://codercba.com:9060/juanpi/api/homeInfo?id=100
    return NextResponse.rewrite(new URL(req.nextUrl.pathname, 'http://codercba.com:9060'))
  }
}
```

---

布局组件



在 /src 夏，新建 /layout/index.tsx 文件。

src\layout\index.tsx

```tsx
import React, { Children, memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.css'

interface IProps {
  children?: ReactNode
}
const Layout: FC<IProps> = memo(props => {
  const { children } = props

  return (
    <div className="layout">
      <div className={styles['header']}>header</div>
      {children}
      <div className={styles['footer']}>footer</div>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
```

src\layout\index.module.css

```css
.header {
  height: 80px;
  text-align: center;
  background-color: pink;
}

.footer {
  height: 100px;
  text-align: center;
  background-color: #cdcdcd;
}
```

在 _app.tsx 中，使用 Layout 组件。

src\pages\_app.tsx

```tsx
import Layout from '@/layout'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
```



在首页，无需页眉页脚，在购物车页面，需要。

在 _app.tsx 中，进行判断

src\pages\_app.tsx

```tsx
import type { AppProps } from 'next/app'
import Layout from '@/layout'

export default function App({ Component, pageProps }: AppProps) {
  const cn = Component.displayName
  console.log('Component Name:', cn)

  return (
    <div>
      {cn === 'Cart' ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  )
}
```



在布局中，嵌套布局。

在 /src/layout 中，新建 ProfileLayout.tsx 布局。

src\layout\ProfileLayout.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const ProfileLayout: FC<IProps> = memo(props => {
  return <div>
    <h1>ProfileLayout</h1>
    { props.children }
  </div>
})

ProfileLayout.displayName = 'ProfileLayout'

export default ProfileLayout
```

在 _app.tsx 中，进行配置：

src\pages\_app.tsx

```tsx
import '@/styles/globals.css'
import '@/styles/main.scss'
import '@/assets/font/iconfont.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '@/layout'
import ProfileLayout from '@/layout/ProfileLayout'

export default function App({ Component, pageProps }: AppProps) {
  const cn = Component.displayName
  console.log('Component Name:', cn)

  return (
    <div>
      {cn === 'Cart' ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : cn === 'Profile' ? (
        <ProfileLayout>
          <Component {...pageProps} />
        </ProfileLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  )
}
```



对布局进行抽取

在 profile.tsx 中，抽取 getLayout 方案。

src\pages\profile\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ReactElement } from 'react'
import Layout from '@/layout';
import ProfileLayout from '@/layout/ProfileLayout';

export interface IStaticProps {
  getLayout?: (page: ReactElement) => ReactElement
}

interface IProps {
  children?: ReactNode
}
const Profile: FC<IProps> & IStaticProps = memo(props => {
  return <div>Profile</div>
})

Profile.displayName = 'Profile'
Profile.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)
export default Profile
```

在 _app.tsx 中，使用：

src\pages\_app.tsx

```tsx
import type { AppProps } from 'next/app'
import Link from 'next/link'
import type { NextPage } from 'next'
import type { ReactElement } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
}
type AppPropWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, pageProps }: AppPropWithLayout) {

  let getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  
  return (
    <div>
    
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
```



嵌套路由



方案一：

在 /profile 中，新建 login.tsx，register.tsx，每个页面，都要有 getLoayout 方法，复用 Profile 的布局。

src\pages\profile\login.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ReactElement } from 'react'
import Layout from '@/layout';
import ProfileLayout from '@/layout/ProfileLayout';

export interface IStaticProps {
  getLayout?: (page: ReactElement) => ReactElement
}
interface IProps {
  children?: ReactNode
}
const Login: FC<IProps> & IStaticProps = memo(props => {
  return <div>Login</div>
})

Login.displayName = 'Login'
Login.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)

export default Login
```

src\pages\profile\register.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ReactElement } from 'react'
import Layout from '@/layout';
import ProfileLayout from '@/layout/ProfileLayout';

export interface IStaticProps {
  getLayout?: (page: ReactElement) => ReactElement
}

interface IProps {
  children?: ReactNode
}
const Register: FC<IProps> & IStaticProps = memo(props => {
  return <div>Register</div>
})

Register.displayName = 'Register'
Register.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)

export default Register

```

在 /profile/index.tsx 中，新增路由链接。

src\pages\profile\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import type { ReactElement } from 'react'
import Layout from '@/layout';
import ProfileLayout from '@/layout/ProfileLayout';
import Link from 'next/link';

export interface IStaticProps {
  getLayout?: (page: ReactElement) => ReactElement
}

interface IProps {
  children?: ReactNode
}
const Profile: FC<IProps> & IStaticProps = memo(props => {
  return <div>
    <h2>Profile</h2>
    <Link href={'/profile/login'}>
      <button>profiel login</button>
    </Link>
    <Link href={'/profile/register'}>
      <button>profiel register</button>
    </Link>
  </div>
})

Profile.displayName = 'Profile'
Profile.getLayout = (page: ReactElement) => (
  <Layout>
    <ProfileLayout>{page}</ProfileLayout>
  </Layout>
)
export default Profile
```



方案二：

创建 06-hello-react-app