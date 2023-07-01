import type { IAppDispatch, IAppRootState } from '@/stores'
import wrapper from '@/stores'
import { fetchSearchSuggest, increment } from '@/stores/features/home'
import type { GetServerSideProps } from 'next'
import { Inter } from 'next/font/google'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { counter } = useSelector(
    (rootState: IAppRootState) => ({
      counter: rootState.home.counter
    }),
    shallowEqual
  )

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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(function (store) {
  return async function (context) {
    // 派发异步 action 来发起请求，拿到搜索建议，并存到 redux 中
    await store.dispatch(fetchSearchSuggest())

    return {
      props: {}
    }
  }
})
