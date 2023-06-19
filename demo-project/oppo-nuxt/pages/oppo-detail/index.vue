<script setup lang="ts">
import { getDetailInfo } from '@/service/detail';
import type { IDetailProductType } from '~/types/detail';
import type { TabsPaneContext } from 'element-plus'
import { ElTabs, ElTabPane } from 'element-plus'
import { ref } from 'vue'

const route = useRoute()
console.log('route.query:', route.query)

const { data } = await getDetailInfo(route.query.type as IDetailProductType);
console.log('data.value?.data:', data.value?.data)


const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="oppo-detail">
    
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>

  </div>
</template>

<style scoped lang="scss">

</style>