import React, { memo, useRef, useState } from 'react'
import type { ElementRef, FC, ReactNode } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { Carousel } from 'antd'
// import type { Banner, Category, Recommend, DigitalData } from '@/types/home'
import type { Banner } from '@/types/home'
import Image from 'next/image'

interface IProps {
  children?: ReactNode
  banners: Banner[]
}
const TopSwiper: FC<IProps> = memo(props => {
  const { banners } = props

  // 状态
  const [currentIndex, setCurrentIndex] = useState(0);

  // ref
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  // 事件处理：轮播图滚动
  const onSwiperChange = (currentSlide: number) => {
    setCurrentIndex(currentSlide)
  }

  // 事件处理：轮播图操作上一屏点击
  const onPrevPage = () => {
    bannerRef.current?.prev();
  }
  
  // 事件处理：轮播图操作下一屏点击
  const onNextPage = () => {
    bannerRef.current?.next();
  }

  return (
    <div className={styles['top-swiper']}>
      {/* 轮播图  */}
      <div className={classNames('wrapper', styles['content'])}>
        <Carousel
          ref={bannerRef}
          className={styles['carousel']}
          autoplay
          autoplaySpeed={3000}
          fade
          dots={false}
          afterChange={onSwiperChange}
        >
          {banners.map(item => (
            <div className={styles['swiper-item']} key={item.id}>
              {/* 背景 */}
              <div
                className={styles['swiper-bg']}
                style={{
                  backgroundImage: `url(${item.backendPicStr})`
                }}
              ></div>

              <Image
                className={styles['image']}
                src={item.picStr}
                alt="banner"
                width={1100}
                height={400}
                priority
              ></Image>
            </div>
          ))}
        </Carousel>

        {/* 指示器 */}
        <ul className={styles['dots']}>
          {banners?.map((item, index) => (
            <li
              key={item.id}
              className={classNames(styles['dot'], currentIndex === index ? styles.active : '')}
            ></li>
          ))}
        </ul>
      </div>

      {/* 操作按钮（上一张/下一张） */}
      <button className={styles['prev']} onClick={onPrevPage}>
        <span></span>
      </button>
      <button className={styles['next']} onClick={onNextPage}>
        <span></span>
      </button>
    </div>
  )
})

TopSwiper.displayName = 'TopSwiper'

export default TopSwiper
