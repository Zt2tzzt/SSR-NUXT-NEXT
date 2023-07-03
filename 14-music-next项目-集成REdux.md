# music-next项目-集成REdux

## 一、项目介绍

网易云音乐-商城项目。

## 二、项目初始化

```shell
npx create-next-app@latest
```

删除多余文件

### 1.安装依赖

样式

```shell
npm install normalize.css

npm install sass

npm install classnames
```

Redux And Toolkit

```shell
npm install next-redux-wrapper # 用于 Redux 的 hydration

npm install @reduxjs/toolkit react-redux
```

Axios

```shell
npm install axios
```

AntDesign

```shell
npm install antd

npm install -D @types/antd
```

### 2.样式初始化

在 `_app.tsx` 中，引入 *normalize*

```tsx
import 'normalize.css';
```

在 `/styles` 目录下，导入全局样式 `globals.scss`，全局样式变量 `variables.scss`。

在 `_app.tsx` 中引入全局样式。

```tsx
import "@/styles/globals.scss";
```

### 3.图标

修改站点图标 `favicon.ico`

### 4.SEO

在 `_document.tsx` 中，进行 SEO 优化。

src\pages\\_document.tsx

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

## 三、布局

在 `/components` 下，新建 `/layout/index.tsx`，`/footer/index.tsx`、`/navbar/index.tsx` 组件。

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

在 `_app.tsx` 中，使用 Layout

src\pages\\_app.tsx

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

## 四、navbar 组件

在 navbar 中，导入样式。

编写左边区域，使用精灵图。

- SEO 优化，使用 h1 标签，创建网站的标题。

编写右边的区域。

src\components\navbar\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import Link from "next/link";
import Search from "../search";

interface IProps {
  children?: ReactNode
}
const NavBar: FC<IProps> = memo(props => {
  return (
    <div className={styles.navbar}>
      <div className={classNames("wrapper", styles.content)}>
        {/* 左侧区域 */}
        <div className={styles["content-left"]}>
          <Link href="/" className={styles.logo}></Link>
          {/* SEO 优化 */}
          <h1 className={styles.title}>云音乐商城 - 音乐购有趣</h1>
        </div>

        {/* 右侧区域 */}
        <div className={styles["content-right"]}>
          <Search></Search>
          {/* 购物车 */}
          <div className={styles["right-cart"]}>
            <Link href="/" className={styles.cart}>
              <span className={styles.count}>6</span>
            </Link>
          </div>
          <div className={styles["right-login"]}>登录</div>
        </div>
      </div>
    </div>
  )
})

NavBar.displayName = 'NavBar'

export default NavBar
```

在 `/components` 下，创建 `/search/index.tsx` 组件。

input 搜索框上，监听三个事件。

src\components\search\index.tsx

```tsx
import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from "classnames";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

interface IProps {
  children?: ReactNode
}
const Search: FC<IProps> = memo(props => {

  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState("蓝牙耳机");

  // 事件处理：输入框回车
  function onInputKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const inputTarget = event.target as HTMLInputElement; // input 元素对象
      console.log(inputTarget.value);
      setInputFocus(false);
    }
  }

  // 事件处理：输入聚焦/失焦
  function onInputFocus(isFocus: boolean) {
    setInputFocus(isFocus);
  }

  return (
    <div className={styles.search}>
      {/* 搜索输入框 */}
      <div className={styles["search-bg"]}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          onFocus={() => onInputFocus(true)}
          onBlur={() => onInputFocus(false)}
          onKeyDown={(e) => onInputKeyDown(e)}
        />
      </div>

      {/* 下拉的面板 */}
      <div
        className={classNames(
          styles["search-panel"],
          inputFocus ? styles.show : styles.hide
        )}
      >
        <div className={styles.shadow}></div>
        <h2>热门搜索</h2>
        <ul>
            <li>哈哈</li>
            <li>哈哈</li>
            <li>哈哈</li>
            <li>哈哈</li>
            <li>哈哈</li>
            <li>哈哈</li>
            <li>哈哈</li>
        </ul>
      </div>
    </div>
  )
})

Search.displayName = 'Search'

export default Search
```

然后要发送网络请求，请求搜索的关键词：

项目中采用 SSR 的模式。

## 五、Nextjs 集成 Redux

安装依赖

```shell
npm install next-redux-wrapper

npm install @reduxjs/toolkit react-redux
```

*next-redux-wrapper* 依赖。

- 在访问服务器端，渲染页面时，避免 store 重置；
- 将服务器端 redux 状态，同步一份到客户端上；
- 提供了 `HYDRATE` 调度操作：
  - 当用户访问动态路由，或后端渲染的页面时，会执行 Hydration 来保持两端数据状态一致
  - 比如：每次当用户打开使用了 `getStaticProps`，或 `getServerSideProps` 函数生成的页面时，HYDRATE 将执行调度操作。

:open_book: 操作步骤：

创建 `/stores/index.ts` 作为 Redux 的入口。

src\stores\index.ts

```typescript
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/home';

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})
```

创建 `/features/home.ts` 作为 home 模块。

src\stores\features\home.ts

```tsx
import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 10
  },
  reducers: {
    increment(state, {type, payload}) {
      state.counter += payload
    }
  }
})

export const { increment } = homeSlice.actions;
export default homeSlice.reducer;
```

让 Redux 中的状态，进行 hydration 的操作。

并提供 TS 类型。

src\stores\features\home.ts

```typescript
import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 10
  },
  reducers: {
    increment(state, { type, payload }) {
      state.counter += payload
    }
  },
  extraReducers(builder) {
    // Hydrate 的操作, 保证服务端端、客户端，数据的一致性
    builder.addCase(HYDRATE, (state, { payload }: any) => {
      return {
        ...state, // state -> initialState
        ...payload.home // action.payload -> rootState
      }
    })
  }
})

export const { increment } = homeSlice.actions
export default homeSlice.reducer
```

store 的创建，

使用 *next-redux-wrapper* 中的 `createWrapper`，对 store 进行封装。

src\stores\index.ts

```typescript
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './features/home';
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})

const wrapper = createWrapper(() => store)
export default wrapper;
```

在 `_app.tsx` 中，接入 redux

src\pages\\_app.tsx

```tsx
import type { AppProps } from 'next/app'
import 'normalize.css'
import '@/styles/globals.scss'
import Layout from '@/components/layout'
import wrapper from '@/stores'
import { Provider } from 'react-redux'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}
```

在 `pages/index.tsx` 中，使用 store。

src\pages\index.tsx

```tsx
import type { IAppDispatch, IAppRootState } from '@/stores';
import { increment } from '@/stores/features/home';
import { Inter } from 'next/font/google'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {counter} = useSelector((rootState: IAppRootState) => ({
    counter: rootState.home.counter
  }), shallowEqual)

  const dispatch: IAppDispatch = useDispatch()
  function onAddBtnClick(payload: number) {
    dispatch(increment(payload))
  }
  return (
    <>
      <div>music Next</div>
      <div>counter: {counter}</div>
      <button onClick={() => onAddBtnClick(1)}>+1</button>
    </>
  )
}
```

## 六、网络请求封装

安装 axios

```shell
npm install axios
```

将以前封装好的 axios 网络请求，拷贝到项目中。

src\service\index.ts

:recycle: 思路：

在首页 `index.tsx` 中，发送网络请求，采用 ssr 的渲染模式。

- 将网络请求，拿到的数据，保存到 Redux 中。
- 再在 navbar 组件中，获取这些数据。

:open_book: 操作步骤：

先在 `/stores/home.ts` 中，编写异步的 action

src\stores\features\home.ts

```typescript
import type { SearchSuggest } from '@/types/home'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { getSearchSuggest } from '@/service/features/home'

interface IHomeState {
  counter: number
  navbar: SearchSuggest | null
}
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 10,
    navbar: null
  } as IHomeState,
  reducers: {
    increment(state, { type, payload }) {
      state.counter += payload
    }
  },
  extraReducers(builder) {
    // Hydrate的操作, 保证服务端端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, { payload }: any) => {
        return {
          ...state, // state -> initialState
          ...payload.home // action.payload.home -> rootState.home
        }
      })
      .addCase(fetchSearchSuggest.fulfilled, (state, { payload }) => {
        state.navbar = payload
      })
  }
})

export const fetchSearchSuggest = createAsyncThunk('fetchSearchSuggest', async () => {
  const res = await getSearchSuggest()
  return res.data
})

export const { increment } = homeSlice.actions
export default homeSlice.reducer
```

在首页 `index.tsx` 中，使用 `wrapper.getServerSideProps` 封装 `getServerSideProps`，

将 Redux 集成到 ssr 的渲染模式中。

src\pages\index.tsx

```typescript
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    // 派发异步 action 来发起请求，拿到搜索建议，并存到 redux 中
    await store.dispatch(fetchSearchSuggest())

    return {
      props: {}
    }
  }
})
```

再在 navbar 中，拿到 Redux 中，“搜索建议”的数据，传递给 search 组件。

src\components\navbar\index.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
//...
import Search from "../search";
import { useSelector } from 'react-redux';
import type { IAppRootState } from '@/stores';

interface IProps {
  children?: ReactNode
}
const NavBar: FC<IProps> = memo(props => {

  const { navbar } = useSelector((rootState: IAppRootState) => ({
    navbar: rootState.home.navbar
  }))

  return (
    <div className={styles.navbar}>
      {/* ... */}
      <Search searchData={navbar}></Search>
    </div>
  )
})

NavBar.displayName = 'NavBar'

export default NavBar
```

在 search 组件中，接收 `searchData`。

src\components\search\index.tsx

```tsx
import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import type { SearchSuggest, ConfigKey } from '@/types/home'

interface IProps {
  children?: ReactNode
  searchData: SearchSuggest | null
}
const Search: FC<IProps> = memo(props => {
  const { children, searchData } = props

  //...

  return (
    <div className={styles.search}>
      {/* 搜索输入框 */}
      <div className={styles['search-bg']}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          onFocus={() => onInputFocus(true)}
          onBlur={() => onInputFocus(false)}
          onKeyDown={e => onInputKeyDown(e as any)}
        />
      </div>

      {/* 下拉的面板 */}
      <div className={classNames(styles['search-panel'], inputFocus ? styles.show : styles.hide)}>
        <div className={styles.shadow}></div>
        <h2>热门搜索</h2>
        <ul>
          {searchData?.configKey &&
            searchData?.configKey.map((item, index) => (
              <li
                key={item[String(index + 1) as keyof ConfigKey]}
              >
                {item[String(index + 1) as keyof ConfigKey]}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
})

Search.displayName = 'Search'

export default Search
```
