<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="keepLiveRoute">
      <component :is="Component" >
      </component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'resource-manage',

  setup () {
    return {
    }
  }
})
</script>
<style lang="less" theme='educational'>
  .p {
    font-size:60px!important;
  }
</style>
