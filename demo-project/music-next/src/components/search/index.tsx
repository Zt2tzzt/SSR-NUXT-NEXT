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

  // const router = useRouter();

  const [inputFocus, setInputFocus] = useState<boolean>(false)
  const [placeholder, setPlaceholder] = useState('蓝牙耳机')

  // 事件处理：输入框回车
  function onInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputTarget = event.target as HTMLInputElement // input 元素对象
      console.log(inputTarget.value)
      // goToSearchPage(inputTarget.value);
      setInputFocus(false)
    }
  }

  // 事件处理：输入聚焦/失焦
  function onInputFocus(isFocus: boolean) {
    // console.log("isFocus=>", isFocus);
    setInputFocus(isFocus)
  }

  /*   function handleItemClick(name: string) {
    console.log(name);
    setPlaceholder(name);
    goToSearchPage(name);
  } */

  /*   function goToSearchPage(name: string) {
    router.push({
      pathname: "/search",
      query: {
        q: name,
      },
    });
  } */

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
                // onMouseDown={() => handleItemClick(item[index + 1])}
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
