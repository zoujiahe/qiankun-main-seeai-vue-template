import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { MicroApp } from 'qiankun/es/interfaces'
import { app } from '@/main'
import { serialPromises2 } from '@/common/utils'
import store from '../store'
const { microAppSetting } = require('../../../../package.json')
const currentSetting = microAppSetting[process.env.VUE_APP_environment][0]
const appMainBase = currentSetting.activeRule.split('/#/')[0]
const appMainName = appMainBase.split('/')[1]
const microhandler = (next) => {
  // 路由跳转卸载局部微应用
  const micro: { [index: string]: MicroApp } = app.config.globalProperties.micro
  const microArr: Promise<null>[] = []
  const keys: string[] = Object.keys(micro)
  if (keys.length) {
    keys.forEach(key => {
      const microItem: MicroApp = micro[key]
      if (microItem && microItem.unmount) {
        microArr.push(microItem.unmount())
      }
    })
    serialPromises2(microArr, () => {
      keys.forEach(childItem => {
        const child = document.getElementById(childItem)
        if (child) {
          document.body.removeChild(child)
        }
        delete app.config.globalProperties.micro[childItem]
      })
      next()
    })
  } else {
    next()
  }
}
const gotoReview = (path) => {
  const hashArr = location.href.split('#')
  let preQuery = ''
  let afterQuery = ''
  if (hashArr && hashArr[0]) {
    let preHash
    if (location.port) {
      preHash = hashArr[0].split(location.port)
    } else {
      preHash = hashArr[0].split(location.host)
    }
    if (preHash && preHash[1]) {
      preQuery = preHash[1]
    }
  }
  if (hashArr && hashArr[1]) {
    const afterHash = hashArr[1].split('?')
    if (afterHash && afterHash[1]) {
      afterQuery = afterHash[1]
    }
  }
  location.href = location.protocol + '//' + location.host + (preQuery || '/') + '#/' + path + (afterQuery ? '?' + afterQuery : '')
}
export const guard = (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
  if (to.path === '/login') {
    if (store.getters.userInfo.token) {
      microhandler(() => {
        gotoReview(appMainName + '/home')
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
