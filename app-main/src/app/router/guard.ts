import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import store from '../store'
import { gotoReview, microhandler } from '@/common/utils'
const { mainBase, mainLayoutIndex } = require('../../../../package.json')

export const guard = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  if (to.path === '/login') {
    if (store.getters.userInfo.token) {
      microhandler(() => {
        gotoReview(mainBase + mainLayoutIndex)
        next()
      })
    } else {
      microhandler(() => {
        next()
      })
    }
  } else {
    if (store.getters.userInfo.token) {
      microhandler(() => {
        next()
      })
    } else {
      microhandler(() => {
        gotoReview('login')
        next()
      })
    }
  }
}
