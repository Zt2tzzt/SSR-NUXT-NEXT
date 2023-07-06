# 编程式导航 & 动态路由 & 中间件 & 布局 & app 目录

## 一、编程导航

Next 13 除了 `<Link>` 组件来实现导航，也支持”编程导航“，缺点是：不利于 SEO。

拿到 `router` 对象：

- 函数式组件中，使用 `useRouter` 函数，从 `next/router` 中导入；
- 类组件中，用 `withRouer`；

`router` 对象的方法：

- `push(url [, as , opts])`：页面跳转；
- `replace(url [, as , opts])`：页面跳转（会替换当前页面）；
- `back()`：页面返回；
- `events.on(name, func)`：客户端路由的监听（建议在 `_app.tsx` 监听），可监听的事件有：：
  - `routeChangeStart`；
  - `routeChangeComplete`。
- `beforePopState`：路由的返回、前进的监听；（建议在 `_app.tsx` 监听）：
- ....

:egg: 案例理解：

在 `_app.tsx` 中，跳转 `find` 页面。

src\pages\\_app.tsx

```tsx
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  console.log('Component Name:', Component.displayName);

  const router = useRouter()
  const onFindClick = () => {

    // 方式一
    // router.push('/find')

    // 方式二
    /* router.push({
      pathname: '/find',
      query: {
        id: 1000,
      }
    }) */

    // 跳转外部链接
    // router.push('https://www.jd.com')

    // 取别名
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

### 1.路由监听（客户端）

客户端路由的监听：

全局的路由监听，一般写在 `_app.tsx` 中。

使用 `useEffects`，进行监听。

src\pages\\_app.tsx

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

## 二、动态路由

Nextjs 支持动态路由，

也是根据目录结构，和文件的名称，自动生成。

动态路由语法：

- 页面组件目录 或页面组件文件，都支持 `[]` 方括号语法（前后不能有字符串）。
- 方括号里编写的字符串就是：动态路由的参数。

例如，下方的目录结构，组成的动态路由：

- pages/detail/[id].tsx -> /detail/:id
- pages/detail/[role]/[id].tsx -> /detail/:role/:id
- pages/detail-[role]/[id].tsx -> /detail-:role/:id

:egg: 案例理解：

新建 detail01、detail02 页面，测试一级，二级动态路由。

在 `_app.tsx` 中，编写路由链接：

src\pages\\_app.tsx

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

### 1.一级路由

在 `/detail01/[id].tsx` 中，获取动态路由的参数。

注意：`router` 只有 `query` 属性，没有 `params` 属性，

- `query` 既可以拿到”查询字符串“，也可以拿到”动态路由的参数“；
- 如果它们重复，取”动态路由的参数“。

> 注意：Nextjs 是 `router`， Nuxt3 是 `route`；

src\pages\detail01\\[id].tsx

```tsx
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Detail01: FC<IProps> = memo(props => {
  const router = useRouter()
  console.log('router.query:', router.query); // router 没有 params 属性，
  // query 既可以拿到查询字符串，也可以拿到动态路由的参数（params），如果重复，取动态路由的参数。

  const { id } = router.query;
  console.log('id:', id);

  return <div>Detail01</div>
})

Detail01.displayName = 'Detail01'

export default Detail01
```

### 2.二级路由

在 `detail02\[role]\[id].tsx` 中，获取动态路由的参数。

src\pages\detail02\\[role]\\[id].tsx

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

## 三、404 page

### 1.全局 404 page

在 `/pages` 目录下，创建 `[...slug].tsx` 或 `404.tsx`（也可创建 `500.tsx`，用于处理服务器报错）：

- "slug" 名称不是固定的。
- `404.tsx` 只能用于捕获全局 404 页面，即只能在 `/pages` 目录下生效。

[...slug] 匹配的参数，将作为 `router` 的 `query` 参数，并且它始终是一个数组，比如：

- 访问 `/post/a` 路径，对应的参数为：`{"slug": ["a"] }`；
- 访问 `/post/a/b` 路径，对应的参数为：`{"slug": ["a", "b"]}`。

src\pages\\[...slug].tsx

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

### 2.局部 404 page

在 `/detail03` 下，创建 `[...slug].vue` 文件：

在其中拿到 slug 参数。

src\pages\detail03\\[...slug].tsx

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

## 四、路由匹配规则总结

路由匹配优先级：”预定义路由“ > ”动态路由“ > ”捕获所有路由“。请看以下示例：

1.预定义路由：`pages/post/create.jsx`

- 将匹配 /post/create

2.动态路由 ：`pages/post/[pid].jsx`

- 将匹配 /post/1, /post/abc 等。
- 但不匹配 /post/create 、 /post/1/1 等

3.捕获所有路由：`pages/post/[...slug].jsx`

- 将匹配 /post/1/2, /post/a/b/c 等。
- 但不匹配 /post/create, /post/abc、/post/1、、/post/ 等

## 五、中间件（middleware）

Nextjs 的中间件，可拦截：

- API 请求；
- router 跳转；
- 资源加载、如：站点图片加载
- ...

可在拦截中，进行：重写，重定向，修改请求响应头，...。

中间件使用，有如下步骤：

1.在根目录中创建 `middleware.ts` 文件；

2.在其中导出一个 `middleware` 函数（支持 async，只在服务端执行），接收两个参数：

- `req`：类型为 `NextRequest`；
- `event`：类型为 `NextFetchEvent`。

3.通过返回 `NextResponse` 对象，来实现重定向等功能。

- `next()`- 继续中间件链；
- `redirect()`- 重定向；如：路由重定向；
- `rewrite()`- 将重写 URL，如：配置反向代理。

4.没返回值：页面按预期加载，和返回 `next()` 效果一样。

:egg: 案例理解：

在根目录，创建 `/src/middleware.ts` 文件。

src\middleware.ts

```typescript
import { type NextRequest } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req: NextRequest) {
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

### 1.匹配器

匹配器，用于过滤请求，让中间件在特定路径上运行，比如：

- `matcher: "/about/:path*"` 意为匹配以 `/about/*` 开头的路径。
  - 其中 `:path` 是修饰符;
  - 而 `*` 代表 0 个 或 n 个 path；
- `matcher: [‘/about/:path*’, ‘/dashboard/:path*’]`，意为匹配以 `/about/*` 和 `/dashboard/*` 开头的路径；
- `matcher: [‘/((?!api|_next/static|favicon.ico).*)‘]`，意思是不匹配以 `api`、`_next`、`static`、`favicon.ico` 开头的路径；

编写匹配器：

src\middleware.ts

```typescript
import { type NextRequest } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req: NextRequest) {
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

### 2.路由拦截

1.放行请求：

src\middleware.ts

```typescript
import { type NextRequest, NextResponse } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req: NextRequest) {
  // 2.返回 next()
  return NextResponse.next(); // 和没有返回值的效果是一样，放行请求
}

// 匹配器，用于过滤
export const config = {
  // (?!_next)  匹配不包含 _next 路径
  matcher: ["/((?!_next/static|api|favicon.ico).*)"],
};
```

2.请求重定向：

路由跳转时，cookie 中没有携带 token 的，重定向到 `/login`。

src\middleware.ts

```typescript
import { NextResponse } from "next/server";

// 1.可拦截，API 请求、router 切换、资源加载、站点图片...
// 2.这个中间件，只在服务器端运行。
export function middleware(req: NextRequest) {
  console.log('req:', req)

  // 3.返回的 重定向
  const token = req.cookies.get("token")?.value;
  if (!token && req.nextUrl.pathname !== "/login") {
    // 重定向到登录页面
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
}

// 匹配器，用于过滤
export const config = {
  // (?!_next)  匹配不包含 _next 路径
  matcher: ["/((?!_next/static|api|favicon.ico).*)"],
};
```

安装 *cookies-nest* 依赖。

```shell
pnpm add cookies-nest
```

在 `login.tsx` 中，设置 cookie

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

安装 *axios* 库

```shell
pnpm add axios
```

在 `index.tsx` 中，发送网络请求。

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

在中间件中，重写网络请求的域名，防止跨域。

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

// 匹配器，用于过滤
export const config = {
  // (?!_next)  匹配不包含 _next 路径
  matcher: ["/((?!_next/static|api|favicon.ico).*)"],
};
```

## 六、布局组件

Layout 布局，是页面的包装器，可将多个页面的共性，写到 Layout 布局中；

使用 `props.children` 属性，来显示页面内容。

- 例如：可将每个页面的页眉、页脚组件，封装到一个 Layout 布局中。

Layout 布局的使用步骤：

1. 在 `/src` 目录下，新建 `/layout/index.tsx` 布局组件；
2. 接着在 `_app.tsx` 中通过 `<Layout>` 组件包裹 `<Component>` 组件。

:egg: 案例理解：

在 `/src` 目录下，新建 `/layout/index.tsx` 文件。

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

编写布局组件的样式。

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

在 `_app.tsx` 中，使用 Layout 组件。

src\pages\\_app.tsx

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

### 1.自定义布局

需求：在首页，无需页眉、页脚，在购物车（Cart）页面，需要。

在 `_app.tsx` 中，进行判断。

src\pages\\_app.tsx

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

### 2.嵌套布局

为 profile 页面，创建嵌套布局。

在 `/src/layout` 中，新建 `ProfileLayout.tsx` 布局。

src\layout\ProfileLayout.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Layout from '@/layout';

interface IProps {
  children?: ReactNode
}
const ProfileLayout: FC<IProps> = memo(props => {
  return (
    <div>
      <Layout>
        <h1>ProfileLayout</h1>
        { props.children }
      </Layout>
    </div>
  )
})

ProfileLayout.displayName = 'ProfileLayout'

export default ProfileLayout
```

在 `_app.tsx` 中，进行配置：

src\pages\\_app.tsx

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

### 3.布局抽取

对布局进行抽取：

在 `profile.tsx` 中，抽取 `getLayout` 方法。

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

在 `_app.tsx` 中，使用：

src\pages\\_app.tsx

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

## 七、嵌套路由

Nextjs 和 Nuxt 3 一样，也支持嵌套路由；

根据目录结构，和文件的名称，自动生成。

有两种方案，分别对应两种模式：pages router 和 app router：

方案一，pages router：使用嵌套布局，来实现嵌套路由。

方案二，app router：使用约定式的嵌套路由。

:egg: 案例理解：

### 1.pages router

方案一：

在 `/profile` 中，新建 `login.tsx`，`register.tsx`；

这两个页面，都要有 `getLoayout` 方法，并复用 ProfileLayout 的布局。

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

在 `/profile/index.tsx` 中，新增路由链接。

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

### 2.app router

方案二：

使用 app router 模式，创建 06-hello-react-app 项目。

目录结构说明：

- `/src/app/page.tsx` 是首页。
- `/src/app/layout.tsx` 是全局的布局页面；

#### 1.基本使用

在 `/src/app` 下，创建 `/cart/page.tsx` 页面：

src\app\cart\page.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Cart: FC<IProps> = memo(props => {
  return <div>Cart</div>
})

Cart.displayName = 'Cart'

export default Cart
```

在首页，添加路由链接。

src\app\page.tsx

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/cart">
        <button>cart</button>
      </Link>
      <h1>Hello Next App</h1>
    </div>
  )
}
```

给 cart 页面，新建布局。

在 `/cart` 目录下，创建 `/layout.tsx` 布局页面。

src\app\cart\layout.tsx

```tsx
import Link from 'next/link'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const CartLayout: FC<IProps> = memo(props => {
  const { children } = props;

  return (
    <div>
      <div>CartLayout</div>
      {children}
    </div>
  )
})

CartLayout.displayName = 'CartLayout'

export default CartLayout
```

#### 2.嵌套路由

创建 `/profile/page.tsx` 页面，和 `/profile/layout.tsx` 布局页面。

在 `/profile` 中，创建两个页面，作为嵌套路由 `/login/page.tsx`，`/register/page.tsx`；

src\app\profile\login\page.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Login: FC<IProps> = memo(props => {
  return (
    <div className="login">
      <div>Login</div>
    </div>
  )
})

Login.displayName = 'Login'

export default Login
```

在 `/profile/layout.tsx` 中，添加路由链接：

> app router 项目中，采用约定式的嵌套路由，不用在嵌套路由的页面，封装 `getLayout` 方法。
>
> pages router 项目中，要在嵌套路由的页面，封装 `getLayout` 方法。

src\app\profile\layout.tsx

```tsx
import Link from 'next/link'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const ProfileLayout: FC<IProps> = memo(props => {
  const { children } = props

  return (
    <div>
      <div>ProfileLayout</div>
      <Link href={'/profile'}>
        <button>profile</button>
      </Link>
      <Link href={'/profile/login'}>
        <button>login</button>
      </Link>
      <Link href={'/profile/register'}>
        <button>login</button>
      </Link>
      {children}
    </div>
  )
})

ProfileLayout.displayName = 'ProfileLayout'

export default ProfileLayout
```

> app 目录和 pages 目录不能共存。

#### 3.Loading 页面

##### 1.全局 loaidng

在 `/app` 中，编写 `loading.tsx` 页面，作为全局的加载页面。

src\app\loading.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Loading: FC<IProps> = memo(props => {
  return <h1>Loading...</h1>
})

Loading.displayName = 'Loading'

export default Loading
```

##### 2.局部 loading

在 `/cart` 中，创建 `loading.tsx` 页面。作为局部的加载页面。

也就是说：当从某一个路由，跳转到 `/cart` 路由时，才会显示的加载页面。

src\app\cart\loading.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const CartLoading: FC<IProps> = memo(props => {
  return <h1>Cart Loading...</h1>
})

CartLoading.displayName = 'CartLoading'

export default CartLoading
```

> loading 页面可以:
>
> - 显示加载的进度；
> - 做”骨架屏“；
