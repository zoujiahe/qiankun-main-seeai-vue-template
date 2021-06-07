<template>
  <div class="app-main-index">
    <h1>This is an app-main-index page</h1>
    <div id="nav">
      <router-link :to="{ name: 'home'}">
        home
      </router-link>
      |
      <router-link :to="{ name: 'demo-construct', query: { id: '0' },params: { id: '1' }}">
        demo-construct
      </router-link>
      <br>
      <router-link :to="{ path: '/app-sub/home'}">
        app-sub/home
      </router-link>
      |
      <router-link :to="{ path: '/app-sub/demo-construct/1',query: { id: '0' }}">
        app-sub/demo-construct
      </router-link>
      <br>
      <router-link :to="{ path: '/app-other-sub/home'}">
        app-other-sub/home
      </router-link>
      |
      <router-link :to="{ path: '/app-other-sub/demo-construct/1',query: { id: '0' }}">
        app-other-sub/demo-construct
      </router-link>
      <br>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized, Router, useRoute, useRouter } from 'vue-router'
import store from '../src/app/store'
import { loadMicroApp } from 'qiankun'

export default defineComponent({
  name: 'AppSubIndex',
  setup () {
    const router: Router = useRouter()
    const toLogin = (e) => {
      router.push({
        path: '/micro-main-app/home'
      })
      e.stopPropagation()
      e.preventDefault()
    }
    return {
      qiankun: process.env.qiankun,
      imgUrl: require('@images/logo.png')
    }
  }
})
</script>
