项目介绍

---

删除多余文件

---

安装依赖：

```shell
npm install normalize.css

npm install sass

npm install classnames
```

在 _app.tsx 中，引入 normalize

```tsx
import 'normalize.css';
```

在 /styles 目录下，导入全局样式 `globals.scss`，全局样式变量 `variables.scss`。

在 _app.tsx 中引入

```tsx
import "@/styles/globals.scss";
```

---

修改站点图标 favicon.ico

在 _document.tsx 中，进行 SEO 优化。

src\pages\_document.tsx

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <title>云音乐商城 - 音乐购有趣</title>
      <Head>
        <meta
          name="keywords"
          content="数码影音，beats耳机，击音耳机，漫步者，akg，潮牌，T恤，音乐生活，食品，服饰配件，礼品，礼物，礼盒，鲜花，ip周边，云音乐，商城，云贝"
        />
        <meta
          name="description"
          content="云音乐商城是专注于音乐场景打造的音乐购物平台，包含音乐人周边、3c影音数码、音乐市集等，和我们一起让音乐购有趣，给生活加点料"
        />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

---

在 /components 下，新建 /layout/index.tsx，footer/index.tsx、navbar/index.tsx 组件。

在 layout 中，使用 footer 和 navbar。

src\components\layout\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import NavBar from '../navbar'
import Footer from '../footer'

interface IProps {
  children?: ReactNode
}
const Layout: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div>
      <NavBar></NavBar>

      {children}

      <Footer></Footer>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout
```

src\components\footer\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Footer: FC<IProps> = memo(props => {
  return <div>Footer</div>
})

Footer.displayName = 'Footer'

export default Footer
```

src\components\navbar\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const NavBar: FC<IProps> = memo(props => {
  return <div>NavBar</div>
})

NavBar.displayName = 'NavBar'

export default NavBar
```

在 _app.tsx 中，使用 Layout

src\pages\_app.tsx

```tsx
import type { AppProps } from 'next/app'
import 'normalize.css'
import '@/styles/globals.scss'
import Layout from '@/components/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

---

在 navbar 中，导入样式。

编写该组件。