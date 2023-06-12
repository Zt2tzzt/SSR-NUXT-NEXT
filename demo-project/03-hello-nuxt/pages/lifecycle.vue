<script>
export default {
  name: 'lifecycle',
  setup () {    
    console.log('setup~')
  },
  beforeCreate() {
    console.log('beforeCreate~')
  },
  created() {
    console.log('created~')
  },
  beforeMount() {
    console.log('beforeMount~')
  },
  mounted() {
    console.log('mounted~')
  },
  beforeUnmount() {
    console.log('beforeUnmount~')
  },
  unmounted() {
    console.log('unmounted~')
  },

  // 执行顺序
  // setup~
  // beforeCreate~
  // created~
  // beforeMount~
  // mounted~

}
</script>

<template>
  <div class="lifecycle">
    lifeCycle
  </div>
</template>

<style scoped>

</style>