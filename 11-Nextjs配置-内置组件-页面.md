什么是 Next.js 框架？

---

Nest.js 发展史

---

Next.js 的特点。

---

Next.js VS Nuxt3

---

Next.js 13 项目创建

---

项目目录结构。



命令解析：

package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start", // 预览，要打包后执行。
    "lint": "next lint"
  },
}
```

---

删除掉多余的文件

在根目录创建 `/component` 目录，创建一个组件 `/my-button/index.jsx`；

src\components\MuButton.jsx

```tsx
import React, { memo } from 'react'

const MyButton = memo(() => {
  return <div>MyButton</div>
})

MyButton.displayName = 'MyButton'

export default MyButton
```

在 index.tsx 中，引入组件

src\pages\index.tsx

```tsx
import MyButton from '@/components/mu-button';

export default function Home() {
  return (
   <>
    <div>Hello Next</div>
    <MyButton></MyButton>
   </>
  )
}
```

配置项目路径别名，默认配置了 `@`

在 tsconfig.json 中，进行配置：

---

环境变量的配置：



创建 .env 文件

在其中定义服务端的环境变量。

```env
NAME=ZZT
AGE=18
```

在 page.jsx 中，获取配置的环境变量。

dotenv 库，会读取 .env 中的变量，存放到 process.env 中。

src\pages\index.tsx

```tsx
import { Inter } from 'next/font/google'
import MyButton from '@/components/MuButton';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  if (typeof window === 'object') {
    console.log('client~');
  } else {
    console.log('server~');
    console.log(process.env.NAME);
    console.log(process.env.AGE);
  }

  return (
    <>
      <div>Hello Next</div>
      <MyButton></MyButton>
    </>
  )
}
```

在 .env 文件中，定义客户端的环境变量：

使用 `NEXT_PUBLIC_` 前缀。

```env
HOST_NAME=localhost
NUMBER=8888

# NEXT_PUBLIC_BASE_URL=http://localhost:8888
# 或者可以复用前面的变量
NEXT_PUBLIC_BASE_URL=http://$HOST_NAME:$NUMBER
```

---

next.config.js 的配置



在其中配置 env 环境变量：basePath

next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 启用严格模式, 辅助我们编写代码, 如果用到了过时的函数 方法 和 属性,会提示已过期
  env: {
    NAME: 'messi',
    NEXT_PUBLIC_BASE_URL: `http://localhost:9999`
  },
  basePath: '/nextjs-blog',
}

module.exports = nextConfig
```

在 index.tsx 中，访问环境变量。

src\pages\index.tsx

```tsx
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
      <div>Hello Next</div>
      <MyButton></MyButton>
      <div>baseUrl: {process.env.NEXT_PUBLIC_BASE_URL}</div>
    </>
  )
}
```

---

内置组件



在 index.tsx 中，使用 Head，Script。

```tsx
import { Inter } from 'next/font/google'
import MyButton from '@/components/MuButton'

import Head from 'next/head'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
```

使用自定义文档，对所有页面，做 SEO 优化。

结构不能修改，但可以给元素加属性。

src\pages\_document.tsx

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="网易云音乐商城"></meta>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body className="zzt">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

---

image 组件



创建 assets 目录，在其中放入需要用到的资源。

创建 About.jsx 页面，在其中使用 `<Image>` 组件，展示本地图片资源。

src\pages\about.tsx

```tsx
import React, { memo } from 'react'
import Image from 'next/image'
import userImage from '@/assets/images/user.png'

const About = memo(() => {
  return (
    <div>
      <h2>About</h2>
      <Image src={userImage} alt="user"></Image>
    </div>
  )
})

About.displayName = 'About'

export default About
```

创建 About.jsx 页面，在其中使用 `<Image>` 组件，展示网络图片资源。

在 next.cofing.js 中，配置图片的白名单：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.music.126.net'
      }
    ]
  }
}

module.exports = nextConfig
```

src\pages\about.tsx

```tsx
import React, { memo } from 'react'
import Image from 'next/image'
import userImage from '@/assets/images/user.png'

const About = memo(() => {
  return (
    <div>
      <h2>About</h2>
      {/* 显示本地图片 */}
      <Image src={userImage} alt="user"></Image>

      {/* 显示网络图片，需要手动指定宽、高，并手动配置白名单 */}
      <Image
        src="https://p2.music.126.net/o9A-kJtQuHsLSNrKVOqEhQ==/18890709277132382.jpg?param=140y140"
        alt="网易云音乐图片"
        width={140}
        height={140}
        priority={true}
      ></Image>
    </div>
  )
})

About.displayName = 'About'

export default About
```

使用原生 img 元素时，建议包裹一个 picture 元素。

src\pages\about.tsx

```jsx
{/* 原生 img 元素的使用 */}
<picture>
  <img src="https://p2.music.126.net/o9A-kJtQuHsLSNrKVOqEhQ==/18890709277132382.jpg?param=140y140" alt="王者荣耀图片" />
</picture>
```

