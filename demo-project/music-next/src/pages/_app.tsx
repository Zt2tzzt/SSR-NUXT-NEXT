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
