<template>
  <div>profession-list</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'profession-list',

  setup () {
    console.log('setup')
    return {
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  }
})
</script>
<style lang="less" theme='educational'>
  .p {
    font-size:60px!important;
  }
</style>
