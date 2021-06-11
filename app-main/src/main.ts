import { createApp } from 'vue'
import App from './App.vue'
import { Antd, AntdIcon } from './assets/plugins'
import router from './app/router'
import store from './app/store'
import CommonPart from './common'
import startQiankun from '@/micro-config'
import './registerServiceWorker'
import '../style/index.scss'
import { MenuServiceKey, MenuService } from '@/common/services'
const { microStart } = require('../../package.json')

// import { prefetchApps } from 'qiankun'

// prefetchApps([
//   { name: 'app-sub', entry: '//locahost:9000/app-sub/#/app-sub/app-sub' },
//   { name: 'app-other-sub', entry: '//locahost:9001/app-other-sub/#/app-other-sub/app-other-sub' }
// ])

const app = createApp(App).use(store).use(router).use(CommonPart).use(Antd).use(AntdIcon)
app.provide(MenuServiceKey, new MenuService())
app.config.globalProperties.micro = {}
app.config.globalProperties.importedScript = {}
if (microStart === '1') {
  app.config.globalProperties.microApp = true
  startQiankun({
    singular: false,
    prefetch: 'all',
    excludeAssetFilter: (assetUrl: string) => {
      const whiteList: string[] = []
      const whiteWords = ['baidu', 'meiqia', 'cookie/flash.js']
      if (whiteList.includes(assetUrl)) {
        return true
      }
      return whiteWords.some(w => {
        return assetUrl.includes(w)
      })
    }
  })
}

app.mount('#app')
export { app }
