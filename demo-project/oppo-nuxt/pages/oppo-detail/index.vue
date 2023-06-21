<script setup lang="ts">
import { getDetailInfo } from '@/service/detail'
import type { IDetailProductType } from '~/types/detail'
import type { TabsPaneContext } from 'element-plus'
import { ref } from 'vue'

// 路由：获取请求参数
const route = useRoute()

// 网络请求：发送网络请求
const { data } = await getDetailInfo(route.query.type as IDetailProductType)

// 状态：激活的 tab 名称。
const activeName = ref(data.value?.data[0].title)

// 事件处理：tab 点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
</script>

<template>
  <div class="oppo-detail">
    <div class="wrapper content">
      <el-tabs v-model="activeName" class="oppo-tabs" @tab-click="handleClick">
        <template v-for="item of data?.data" :key="item.id">
          <el-tab-pane :label="item.title" :name="item.title">
            <GridView :listData="item.productDetailss"></GridView>
          </el-tab-pane> 
        </template>、
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.oppo-detail {
  background-color: $bgGrayColor;
  padding-bottom: 60px;
  padding-top: 8px;

  .content {
    .oppo-tabs {
      /* 背景 */
      :deep(.el-tabs__header) {
        background-color: white;
      }

      :deep(.el-tabs__nav-wrap) {
        height: 48px;
        padding: 0 52px;
        /* 底部线 */
        &::after {
          background-color: white;
        }
        /* 按钮 */
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          width: 48px;
          .el-icon,
          svg {
            width: 25px;
            height: 25px;
          }
          svg {
            position: relative;
            top: 10px;
          }
        }

        /* 移动线条激化样式 */
        /* .el-tabs__nav-next + .el-tabs__nav-scroll .el-tabs__active-bar {
          left: 0px;
        } */
        .el-tabs__active-bar {
          background-color: $priceColor;
          /* left: 48px; */
        }
      }

      :deep(.el-tabs__item) {
        height: 48px;
        opacity: 0.6;
        font-weight: 400;
        padding-top: 5px;

        position: relative;
        /* hover字体演示 */
        &:hover,
        &.is-active {
          color: $priceColor;
        }
      }
    }
  }
}
</style>
