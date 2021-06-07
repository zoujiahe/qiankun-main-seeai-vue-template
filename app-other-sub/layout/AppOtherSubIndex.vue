<template>
  <div class="app-other-sub-index">
    <div id="nav">
      <h1>This is an app-other-sub-index page</h1>
      <router-link :to="{ name: 'home'}">home</router-link>
      |
      <router-link :to="{ name: 'demo-construct', query: { id: '0' },params: { id: '1' }}">demo-construct</router-link>
      <br/>
      <template v-if='qiankun'>
        <a @click='toLogin($event)' >app-main:home</a>
        |
        <a @click='toDemoConstruct($event)' v-if='qiankun'>app-main:demo-construct</a>
        <br/>
        <a @click='toOtherHome($event)'>app-sub：home</a>
        |
        <a @click='toOtherDemoConstruct($event)'>app-sub：demo-construct</a>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { RouteLocationNormalized, Router, useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'app-other-sub-index',
  setup () {
    const router: Router = useRouter()
    const instance = getCurrentInstance()
    let qiankun
    if (instance) {
      qiankun = instance.appContext.config.globalProperties.qiankun
    }
    const toLogin = (e) => {
      router.push({
        path: '/micro-app-main/home'
      })
      e.stopPropagation()
      e.preventDefault()
    }
    const toDemoConstruct = (e) => {
      router.push({
        path: '/micro-app-main/demo-construct/1',
        query: {
          id: 0
        }
      })
      e.stopPropagation()
      e.preventDefault()
    }
    const toOtherDemoConstruct = (e) => {
      router.push({
        path: '/app-sub/demo-construct/1',
        query: {
          id: 0
        }
      })
      e.stopPropagation()
      e.preventDefault()
    }
    const toOtherHome = (e) => {
      router.push({
        path: '/app-sub/home'
      })
      e.stopPropagation()
      e.preventDefault()
    }
    return {
      toLogin,
      toDemoConstruct,
      toOtherDemoConstruct,
      toOtherHome,
      qiankun,
      imgUrl: require('@images/logo.png')
    }
  }
})
</script>
