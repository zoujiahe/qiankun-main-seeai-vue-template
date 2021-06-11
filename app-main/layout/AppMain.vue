<template>
  <suspense>
    <template #default>
      <app-main-index></app-main-index>
    </template>
    <template #fallback>
      <div style='height:100%;width:100%;margin-top: 30%;'>
        <a-spin size="large" tip='加载数据中'/>
      </div>
    </template>
  </suspense>
<!--  <div class="scholar-main">-->
<!--    <h1>This is an scholar-main page</h1>-->
<!--    <div id="nav">-->
<!--      <router-link :to="{ name: 'home'}">-->
<!--        home-->
<!--      </router-link>-->
<!--      |-->
<!--      <router-link :to="{ name: 'demo-construct', query: { id: '0' },params: { id: '1' }}">-->
<!--        demo-construct-->
<!--      </router-link>-->
<!--      <br>-->
<!--      <router-link :to="{ path: '/scholar-sub/home'}">-->
<!--        scholar-sub/home-->
<!--      </router-link>-->
<!--      |-->
<!--      <router-link :to="{ path: '/scholar-sub/demo-construct/1',query: { id: '0' }}">-->
<!--        scholar-sub/demo-construct-->
<!--      </router-link>-->
<!--      <br>-->
<!--      <router-link :to="{ path: '/scholar-other-sub/home'}">-->
<!--        scholar-other-sub/home-->
<!--      </router-link>-->
<!--      |-->
<!--      <router-link :to="{ path: '/scholar-other-sub/demo-construct/1',query: { id: '0' }}">-->
<!--        scholar-other-sub/demo-construct-->
<!--      </router-link>-->
<!--      <br>-->
<!--    </div>-->
<!--    <router-view />-->
<!--  </div>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { RouteLocationNormalized, Router, useRoute, useRouter } from 'vue-router'
// import store from '../src/app/store'
// import { loadMicroApp } from 'qiankun'
import AppMainIndex from './app-main-index/AppMainIndex.vue'

export default defineComponent({
  name: 'app-main',
  components: {
    AppMainIndex
  },
  setup () {
    // const router: Router = useRouter()
    // const toLogin = (e) => {
    //   router.push({
    //     path: '/micro-main-app/home'
    //   })
    //   e.stopPropagation()
    //   e.preventDefault()
    // }
    return {
      // qiankun: process.env.qiankun,
      // imgUrl: require('@images/logo.png'),

    }
  }
})
</script>
