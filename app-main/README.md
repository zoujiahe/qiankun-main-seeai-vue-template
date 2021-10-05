# qiankun-main-seeai-vue-template

恒企SEEAI平台前端项目开发的通用乾坤微服务vue3主应用模板([6+通用模板源PC端主应用](https://gitee.com/xccjh-zjh))，支持微服务多应用。

![](https://xccjhzjh.oss-cn-hongkong.aliyuncs.com/xccjh-images/seeai-tempalte-demo.gif)

## 技术栈
[vue3](https://v3.cn.vuejs.org/)+[typescript](https://www.tslang.cn/)+[ant-design-vue](https://2x.antdv.com/components/overview-cn/)+[qiankun](https://qiankun.umijs.org/zh)+ [ckeditor5-xccjh](https://gitee.com/xccjh/ckeditor5-xccjh) + [vue3-theme-peel](https://gitee.com/xccjh/vue3-theme-peel) + 
[vue3-draggable-drop](https://gitee.com/xccjh/vue3-draggable-drop)

## 项目运行
1. 使用[开源seeai-cli脚手架](https://www.npmjs.com/package/@xccjh/ky-seeai-cli)拉取代码,初始化项目 seeai-cli create [project-name]
2. 安装整个微服务依赖 yarn
3. 运行整个微服务 yarn start
- 主应用访问地址  http://127.0.0.1:8300/micro-app-main/#/**
    - 主应用路由系统  http://127.0.0.1:8300/micro-app-main/#/micro-app-main/**
    - 示例微应用路由系统 http://127.0.0.1:8300/micro-app-main/#/app-sub/**
- 示例微应用单独访问地址 http://127.0.0.1:8301/app-sub/#/**
4. 单独运行主应用 yarn run start:app-main 或 cd app-main && yarn start 
应用访问地址  http://127.0.0.1:8300/micro-app-main/#/**
5. 单独运行示例微应用 yarn run start:app-sub 或 cd app-sub && yarn start
应用访问地址  http://127.0.0.1:8301/app-sub/#/**

6. 环境变量注入示例

配置相关
- VUE_APP_deploy：0 | 1 用来标志是否用来部署，为1时在eslint检测debugger/console警告，注册serviceWorker和进行gzip压缩，抽离主题文件
- VUE_APP_SourceMap：0 | 1 开发环境一定会有源码映射，部署环境下控制sourceMap生成
- NODE_ENV：vue和插件系统依赖内部进行优化处理
- VUE_APP_environment：微服务区分不同配置环境
- VUE_APP_HTTPS：开发环境是否开启https

题库相关
- VUE_APP_questionBank：题库后台地址，如增加问卷试卷用
- VUE_APP_tkPage：题库前台地址，如做试卷问卷用
- VUE_APP_questionBankGateway：智适应题库api服务域名(只抽题)
- VUE_APP_questionBankApi：题库网关地址
- VUE_APP_paperApi：swagger做题api服务域名

保利威相关
- VUE_APP_polywayApi：保利威API接口前缀
- VUE_APP_polywayUpload：保利威上传视频接口前缀
- VUE_APP_writetoken：保利威文件写token
- VUE_APP_cataid：启课程加密分类id
- VUE_APP_userid：保利威用户id
- VUE_APP_secretkey：保利威密钥

后端对接相关
- VUE_APP_commonViewer：公共服务预览的地址
- VUE_APP_endpoint：oss访问域名
- VUE_APP_OSS_URL：oss资源路径前缀
- VUE_APP_SERVER_URL：seeai后台接口地址前缀

nc相关
- VUE_APP_ncCourseType：nc课程科目类型接口地址前缀

## 目录结构
由于vue3对typescript的支持已经成熟，不采用装饰器的写法，也省去了`class-style component syntax`中`vue-class-component`和扩展`vue-property-decorator`插件的安装。
**主业务逻辑在app-main主应用开发部署即可**。
```sh
- app-main                                       微服务主应用
    |- doc/                                          项目关键技术文档
    |- script/                                       工具脚本
        |- git/                                      git相关脚本
        |- utils/                                    项目外工具方法和调试方法
    |- public/                                       首页模板资源
        |- index.html
    |- localfile/                                    本地文件服务器文件存放位置
    |- server/                                       本地项目托管，用来模拟生产情况等
        |- csr.key                                   https认证key
        |- file.crt                                  https证书
        |- private.key                               https私钥
        |- server.js                                 本地服务托管
        |- fileServer.js                             本地文件服务器
    |- layout/                                       全局布局模块组件
        |- AppIndex.vue                              总业务承载组件
        |- Home.vue                                  其他边缘业务组件
        |- Login.vue                                 登录
    |- deploy/                                       部署相关
    |- typings/                                      编辑器类型定义扩展
        |- index.d.ts
    	|- custom-typings.d.ts
    |- local/                                        本地服托管的目录，用来多项目同域联调，不参与项目编译
    |- src/                                          项目主代码
        |- app/                                      总业务逻辑
            |- api/                                  后端api联调
                |- common/                           公共请求接口
                |- auth.ts                           认证
                |- error-code.ts                     错误码
                |- http.ts                           公共请求方法
                |- interceptors.ts                   请求拦截器
                |- requestInstant.ts                 源实例
                |- index.ts                          总导出
            |- router/                               总路由注册
                |- guard.ts                          路由拦截器
                |- index.ts                          总路由管理
            |- store/                                总数据仓库注册
                |- index.ts                          总状态管理
            |- views/                                总业务逻辑代码
                 |- demo-construct/                  单模块
                    |- api/                          单模块请求方法清单
                         |- demo-children.api.ts     子组件请求方法清单
                         |- demo-construct.api.ts    模块组件请求方法清单
                         |- index.ts
                    |- components/                   单模块组件
                         |- demo-children.vue        子组件
                         |- index.ts                 子组件导出
                    |- demo-construct.vue            单模块入口组件
                    |- demo-construct.route.ts       单模块子路由
                    |- demo-construct.store.ts       单模块子数据仓库
                    |- demo-construct.util.ts        单模块工具方法
                    |- demo-construct-constants.ts   单模块常量定义
                    |- index.ts                      单模块导出
        |- assets/                                   静态文件资源
            |- iconfont/                             图标
            |- images/                               图片
            |- plugins                               第三方插件总注册
                |- antd.ts                           antd按需注册
                |- global-svg.ts                     svg全局注册
                |- index.ts                          插件总导出
            |- svg/                                  所有svg图片，创建即注册
        |- common /                                  公共服复用逻辑
            |- base/                                 全局泛型
                |- enum.ts                           公共枚举
                |- common.ts                         公共泛型
                |- index.ts
            |- components/                           公共组件
                |- index.ts
                |- svg-icon/                         单个公共组件
                    |- index.ts
                    |- svg-icon.vue                  单个公共组件逻辑
                    |- svg-icon.scss                 单个公共组件样式
                    |- README.md                     单个组件用法说明
            |- constants/                            公共常量
                |- index.ts
                |- uploadDir.ts                      oss目录常量
                |- static-data.ts                    全局常量
            |- directives/                           公共指令
                |- index.ts
                |- click-outside.ts                  单个指令
                |- README.md                         指令用途说明
            |- mixins/                               公共混入
                |- index.ts
                |- base.ts                           公共逻辑
            |- services/                             公共服务
                |- index.ts
                |- normal-menu/                      单个服务
                     |- normal-menu.scss             样式
                     |- normal-menu.scss             逻辑
                     |- README.md                    服务用途说明
            |- utils/                                公共工具类
                |- index.ts
                |- localstorage.util.ts              本地数据操作工具
                |- sessionstorage.util.ts            会话数据操作工具
                |- tools.util.ts                     通用工具
                |- common.ts                         公共工具
                |- crypto.ts                         加盐算法
                |- base64.ts                         base64解码加码
                |- download.ts                       oss下载
                |- uuid.ts                           随机串
                |- validator.ts                      全局正则
            |- index.ts
    |- style/                                        全局样式
    	|- index.scss
        |- style.scss                                全局样式定义
        |- _mixin.scss                               全局样式工具
    	|- reset.scss                                清零化样式
        |- normalize.scss                            归一化样式
    |- theme/                                        主题
        |- default/                                  默认主题
            |- index.scss
            |- _variable.scss                        修改组件主题变量列表
    |- App.vue                                       主组件入口
    |- main.ts                                       单页面启动入口
    |- polyfills.js                                  兼容垫片
    |- vue.config.js                                 vue全局配置
    |- README.md                                     项目主要信息介绍
    |- release-prod.log                              正式线发版记录
    |- release-test.log                              测试线发版记录
    |- CHANGELOG.zh-CN.md                            项目版本更新中文记录
    |- .env.development                              开发环境变量注入
    |- .env.intranet                                 beta环境变量注入
    |- .env.production                               生产环境变量注入
    |- .env.test                                     测试环境变量注入
    |- .eslintrc.js                                  eslint全局配置
    |- tsconfig.json                                 tslint全局配置
    |- babel.config.js                               babel编译配置
    |- .npmrc                                        npm变量配置
    |- .yarnrc                                       yarn变量配置
|- app-sub                                       微服务示例微应用
|- app-other-sub                                 微服务示例微应用
|- package.json                                      微服务总配置文件
```
## 部署情况
### 常规部署
1. 主应用：http://xxx.com/﻿micro-app-main/
2. 子应用：http://xxx.com/app-sub/
3. 其他子应用以此类推

### 更换部署目录
全局替换<b>micro-app-main</b>等目录关键字即可。

> 主应用和微应用分别单独部署即可,自成一体。 


## tag介绍
+ v1.0.0 一键初始化整合乾坤SEEAI通用vue主应用模板
+ v2.0.0 一键初始化后增加了通用后台模板实例

![](https://images.gitee.com/uploads/images/2021/0628/164931_040b76d8_2141437.png)

## 模板优化点建议
+ 待补充

## 项目注意点
1. [团队合作开发规范要点](https://xccjh.gitee.io/vuebloger/technology/vue团队开发规范.html)
2. [微前端方案的思考](https://xccjh.gitee.io/vuebloger/technology/微前端方案的思考.html) 
3. [ow365](https://officeweb365.com/Help/Default/5)
4. [wps-jsSDK](https://wwo.wps.cn/docs-js-sdk/#/)
5. [百度统计](https://tongji.baidu.com/web/welcome/login)
6. [保利威](https://dev.polyv.net/2020/videoproduct/v-player-sdk/v-player-sdk-web/v-player-sdk-web-feature/play/)
7. [SEEAI项目标准开发脚手架](http://oss.xccjh.top/vuebloger/)
8. [SEEAI标准项目模板gitee源](https://gitee.com/xccjh-zjh)
9. [一键换肤方案](https://gitee.com/xccjh/vue3-theme-peel)
10. [富文本方案](https://gitee.com/xccjh/ckeditor5-xccjh)
11. [网格拖拽方案](https://gitee.com/xccjh/vue3-draggable-drop)

## 微服务总线通讯方式

### Actions 通信
1. Actions总线
```typescript
// qiankun-action.ts
class QiankunActionsService {
  actions: {
    onGlobalStateChange: (callback: (state: Record<string, any>, prevState: Record<string, any>) => void, fireImmediately?: boolean) => void;
    setGlobalState: (state: Record<string, any>) => boolean | void
  } = {
    onGlobalStateChange: (...arg) => {
      console.warn('Current execute action is empty!')
      console.log(arg)
    },
    setGlobalState: (...arg) => {
      console.warn('Current execute action is empty!')
      console.log(arg)
    }
  };
  setActions (actions) { // 👈 当一个主应用调用个微应用时，props会存在 onGlobalStateChange 和 setGlobalState 用来监听 应用之间的数据变动 和传入数据
    this.actions = actions
  }
  onGlobalStateChange (callback, fireImmediately?) {  // 👈 统一维护项目中监听应用之间数据变动
    if (this.actions.onGlobalStateChange) {
      return this.actions.onGlobalStateChange(callback, fireImmediately)
    }
  }
  setGlobalState (args) { // 👈 统一维护项目中应用之间数据
    return this.actions.setGlobalState(args)
  }
}
export const QiankunActionsInstance = new QiankunActionsService()
```

> qiankun 内部提供了 initGlobalState 方法用于注册 MicroAppStateActions 实例用于通信，该实例有三个方法，分别是：
- setGlobalState：设置 globalState - 设置新的值时，内部将执行 浅检查，如果检查到 globalState 发生改变则触发通知，通知到所有的 观察者 函数。
- onGlobalStateChange：注册 观察者 函数 - 响应 globalState 变化，在 globalState 发生改变时触发该 观察者 函数。
- offGlobalStateChange：取消 观察者 函数 - 该实例不再响应 globalState 变化。

2. 主应用监听来微应用的数据变动以及子应用监听来自主应用的数据改动

查看下面share总线通讯说明即可。

### Shared 通信
1. Shared总线的通讯清单
```typescript
// qiankun-share.ts
import store from '@/app/store'
class Shared {  // 👈 维护微应用之间通讯清单列表，独立运行时连通本应用store,微应用运行时重载为调用该应用的主应用传入的share实例进而连通其store
  getUserInfo () {
    // 子应用独立运行时，在 localStorage 中获取 token
    return store.getters.userInfo
  }
  setUserInfo (data) {
    store.commit('setUserInfo', data)
  }
}

class SharedModule {
  static shared:any = new Shared();
  /**
   * 重载 shared
   */
  static overloadShared (shared:any) {
    SharedModule.shared = shared
  }
  /**
   * 获取 shared 实例
   */
  static getShared () {
    return SharedModule.shared
  }
}
export default SharedModule
```
2. 启动微应用总配置
```typescript
// micro-app-config.ts
import { shared } from '@/common/services'
import { Json } from '@/common/base'
const packageConfig = require('../../../package.json')
const config: {
  name: string;
  entry: string;
  container: string | HTMLElement;
  activeRule: string;
  props: Json
}[] =
  []
packageConfig.microAppSetting[process.env.VUE_APP_environment].forEach(item => {
  const param = {
    name: item.name,
    entry: `${item.host}${':' + item.port + item.base}`,
    container: item.container,
    activeRule: item.activeRule,
    props: { ...item.props, shared } // 👈 shared总线维护着微应用之间通讯信息列表
  }
  config.push(param)
})
console.log('微前端位置数据： ====》')
console.log(config)  // 👈 整合后的微服务启动配置
export default config
```

### Compiles and minifies for production
3. package.json中微应用配置：
```typescript
  "microAppSetting": {
    "current": 0,
    "port": 8300,
    "development": [ // 👈 开发环境
      {
        "name": "app-sub",
        "host": "http://localhost",
        "port": "8301",
        "container": "#frame",
        "base": "/app-sub/#/",
        "activeRule": "/micro-app-main/#/app-sub",
        "props": {
          "name": "app-sub",
          "action": ""
        }
      },
      {
        "name": "app-other-sub",
        "host": "http://localhost",
        "port": "8302",
        "container": "#frame",
        "base": "/app-other-sub/#/",
        "activeRule": "/micro-app-main/#/app-other-sub",
        "props": {
          "name": "app-other-sub",
          "action": ""
        }
      }
    ],
    "test": [ // 👈 测试环境
      {
        "name": "app-sub",
        "host": "http://ky.qicourse.cn",
        "port": "80",
        "container": "#frame",
        "base": "/app-sub/#/",
        "activeRule": "/micro-app-main/#/app-sub",
        "props": {
          "name": "app-sub",
          "action": ""
        }
      },
      {
        "name": "app-other-sub",
        "host": "http://ky.qicourse.cn",
        "port": "80",
        "container": "#frame",
        "base": "/app-other-sub/#/",
        "activeRule": "/micro-app-main/#/app-other-sub",
        "props": {
          "name": "app-other-sub",
          "action": ""
        }
      }
    ],
    "intranet": [  // 👈 预发布环境
      {
        "name": "app-sub",
        "host": "https://seeai-pre.hqjy.com",
        "port": "443",
        "container": "#frame",
        "base": "/app-sub/#/",
        "activeRule": "/micro-app-main/#/app-sub",
        "props": {
          "name": "app-sub",
          "action": ""
        }
      },
      {
        "name": "app-other-sub",
        "host": "https://seeai-pre.hqjy.com",
        "port": "443",
        "container": "#frame",
        "base": "/app-other-sub/#/",
        "activeRule": "/micro-app-main/#/app-other-sub",
        "props": {
          "name": "app-other-sub",
          "action": ""
        }
      }
    ],
    "production": [ // 👈 生产环境
      {
        "name": "app-sub",
        "host": "https://seeai.hqjy.com",
        "port": "443",
        "container": "#frame",
        "base": "/app-sub/#/",
        "activeRule": "/micro-app-main/#/app-sub",
        "props": {
          "name": "app-sub",
          "action": ""
        }
      },
      {
        "name": "app-other-sub",
        "host": "https://seeai.hqjy.com",
        "port": "443",
        "container": "#frame",
        "base": "/app-other-sub/#/",
        "activeRule": "/micro-app-main/#/app-other-sub",
        "props": {
          "name": "app-other-sub",
          "action": ""
        }
      }
    ]
  }
```
4. 主应用启动微服务
```typescript
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  registerMicroApps,
  start,
  addGlobalUncaughtErrorHandler,
  initGlobalState,
  setDefaultMountApp,
  MicroAppStateActions
} from 'qiankun'
// 注册子应用信息
import microApps from './micro-app-config'
const packageConfig = require('../../../package.json')
let qiankunActions :MicroAppStateActions
if (packageConfig.microStart === '1') {  // 👈 本地环境开启微服务
  /***
   * 注册子应用
   * 第一个参数： 子应用的注册信息。
   * 第二个参数:  全局生命周期钩子。
   */
  registerMicroApps(microApps, {
    // qiankun 生命周期钩子 - 加载前
    beforeLoad: [(app) => {
      // 加载子应用前，加载进度条
      NProgress.start()
      console.log('before load', app.name)
      return Promise.resolve()
    }],
    // qiankun 生命周期钩子 - 挂载后
    afterMount: [(app) => {
      // 加载子应用前，进度条加载完成
      NProgress.done()
      console.log('after mount', app.name)
      return Promise.resolve()
    }],
    // qiankun 生命周期钩子 - 卸载后
    afterUnmount: [app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      return Promise.resolve()
    }]
  })
  // 设置默认启动的子应用
  // setDefaultMountApp(packageConfig.microAppSetting[process.env.VUE_APP_environment][packageConfig.microAppSetting.current].activeRule)
  qiankunActions = initGlobalState({}) // 👈 注入微应用之间全局公用的的数据属性
  qiankunActions.onGlobalStateChange((state, prev) => { // 👈 检测微应用之间通讯数据的变更
    // 👈 action总线插入点，主应用在这里监听微应用之间的数据变动
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev)
  })
  /***
   * 添加全局异常捕获处理器
   */
  addGlobalUncaughtErrorHandler(event => {
    console.error(event)
  })
}
// 导出 qiankun 的启动函数
export default start
export {
  qiankunActions
}
```
5. 子应用入口接入share总线
```typescript
import './public-path'
import { createApp } from 'vue'
import 'default-passive-events'
import App from './App.vue'
import '../style/index.scss'
import { Antd } from './assets/plugins'
import './registerServiceWorker'
import router from './app/router'
import store from './app/store'
import CommonPart from './common'
import { Json } from '@/common/base'
import { QiankunActionsInstance, SharedModule } from '@/common/services' //  👈 两条数据通讯总线
import { win } from '@/common/base/common'
declare const window :win
let instance
const qiankun = window.__POWERED_BY_QIANKUN__  // 👈 检测是否微应用模式启动
function render (props: Json = {}) {
  if (props) {
    QiankunActionsInstance.setActions(props) // 👈 注入 actions 实例 , 接入action总线
    const { shared = SharedModule.getShared() } = props
    SharedModule.overloadShared(shared) // 👈 重载 share 实例，接入share总线
  }
  const { container } = props
  instance.config.globalProperties.qiankun = qiankun
  instance.mount((container ? container.querySelector('#app') : '#app'))
}
// 独立运行时
if (!qiankun) {
  render()
}
export async function bootstrap () { // 👈 微应用启动时候调用勾子
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) { // 👈 微应用启动时候调用勾子
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () { // 👈 微应用启动时候调用勾子
  instance.unmount()
  instance = null
}
// 增加 update 钩子以便主应用手动更新微应用
export async function update (props) { // 👈 微应用启动时候调用勾子
  // renderPatch(props);
  console.log(props)
}
export default instance // 👈 导出应用示例用来全局托管共享各类全局应用数据
```
6. 主应用share总线通讯用法示例
```vue
<template>
  <div class="home">
    <h1>This is an scholar-main home page</h1>
    <h1>Welcome To Use SEEAI Template</h1>
    <div>
      <img
        :src="imgUrl"
        alt=""
      >
    </div>
    <br>
    <a-button
      style="margin-bottom:20px;"
      @click="loadSubPart($event)"
    >
      load scholar-sub part
    </a-button>
    <br>
    <a-button
      style="margin-bottom:20px;"
      @click="loadOtherSubPart($event)"
    >
      load scholar-other-sub part
    </a-button>
    <br>
    <a-button @click="unMountPart($event)">
      unmout scholar-sub&scholar-other-sub part
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { loadMicroApp } from 'qiankun'
import { loadScript } from '@/common/utils'
import { Shared } from '@/common/services/qiankun-share' //  👈 准备注入share实例实现数据通讯
import { message } from 'ant-design-vue'
const { microAppSetting } = require('../../package.json')
const microApp1Config = microAppSetting[process.env.VUE_APP_environment][0]
const microApp2Config = microAppSetting[process.env.VUE_APP_environment][1]

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
export default defineComponent({
  name: 'Home',
  setup () {
    const instance = getCurrentInstance()

    const unMountPart = () => { // 👈 卸载微应用
      if (instance) {
        const micro = instance.appContext.config.globalProperties.micro // 👈 挂载全局的目的是为了路由切换自动卸载防止内存泄漏
        if (micro.microApp1 && micro.microApp1.getStatus() === 'MOUNTED') {
          micro.microApp1.unmount().then(() => {
            const child1 = document.getElementById('microApp1')
            if (child1) {
              document.body.removeChild(child1)
            }
          })
        }
        if (micro.microApp2 && micro.microApp2.getStatus() === 'MOUNTED') {
          micro.microApp2.unmount().then(() => {
            const child2 = document.getElementById('microApp2')
            if (child2) {
              document.body.removeChild(child2)
            }
          })
        }
      }
    }
    const loadOtherSubPart = (e) => { // 👈 简单挂载另外一个微应用
      if (instance) {
        const micro = instance.appContext.config.globalProperties.micro
        const divDom2 = document.createElement('div')
        divDom2.id = 'microApp2'
        divDom2.style.width = '400px'
        divDom2.style.height = '400px'
        divDom2.style.position = 'fixed'
        divDom2.style.zIndex = '99999'
        divDom2.style.overflow = 'auto'
        divDom2.style.right = '10%'
        divDom2.style.top = '50%'
        divDom2.style.backgroundColor = 'white'
        divDom2.style.transform = 'translateY(-50%)'
        divDom2.style.boxShadow = '0 0 10px grey'
        document.body.appendChild(divDom2)
        // micro.microApp2 = loadMicroApp({
        //   name: microApp2Config.name,
        //   entry: `${microApp2Config.host}:${microApp2Config.port}/${microApp2Config.name}/#/${microApp2Config.name}/home`,
        //   container: '#microApp2',
        //   props: {
        //     name: microApp2Config.name
        //   }
        // }, {
        //   singular: false
        // })
        const shared = new Shared('two')
        shared.setFilePreviewState({
          polywayId: '',
          share: '0',
          furl: '/data/courseware/case/doc/s1hs19kvlrc2bfxe1603440271989/0n8qj0e382xdyona1603440593259.ppt',
          native: '1',
          ow365: '0',
          viewerId: shared.getUserInfo().id,
          orgCode: 'cjsd',
          showTimer: '1',
          filePreviewCallBack () {
            alert('阅读完成了')
          }
        })
        micro.microApp2 = loadMicroApp({
          name: 'xxx2',
          entry: process.env.VUE_APP_commonViewer,
          container: '#microApp2',
          props: {
            name: 'xxx2',
            shared
          }
        }, {
          sandbox: {
            experimentalStyleIsolation: true
          }
        })
      }
    }
    const loadSubPart = (e) => { // 👈 简单挂载一个微应用
      if (instance) {
        const micro = instance.appContext.config.globalProperties.micro // 👈 挂载全局的目的是为了路由切换自动卸载防止内存泄漏
        const divDom1 = document.createElement('microApp1')
        divDom1.id = 'microApp1'
        divDom1.style.width = '400px'
        divDom1.style.height = '400px'
        divDom1.style.position = 'fixed'
        divDom1.style.zIndex = '99999'
        divDom1.style.overflow = 'auto'
        divDom1.style.left = '10%'
        divDom1.style.top = '50%'
        divDom1.style.backgroundColor = 'white'
        divDom1.style.transform = 'translateY(-50%)'
        divDom1.style.boxShadow = '0 0 10px grey'
        document.body.appendChild(divDom1)
        // micro.microApp1 = loadMicroApp({
        //   name: microApp1Config.name,
        //   entry: `${microApp1Config.host}:${microApp1Config.port}/${microApp1Config.name}/#/${microApp1Config.name}/home`,
        //   container: '#microApp1',
        //   props: {
        //     name: microApp1Config.name
        //   }
        // }, {
        //   singular: false
        // })
        loadScript('//player.polyv.net/resp/vod-player/latest/player.js').then(flag => {
          if (flag) {
            const shared = new Shared('one') // 👈 生成share实例实现数据通讯，一般每个微应用对应一个share实例
            shared.setFilePreviewState({ // 👈 连通各个应用store,形成一个通讯清单，每个方法塞进想要通讯的数据和方法
              polywayId: 'a647f95e6e8a407915e0d24d6b5adc48_a',
              share: '0',
              furl: '',
              native: '1',
              ow365: '0',
              viewerId: shared.getUserInfo().id,
              orgCode: 'cjsd',
              showTimer: '1',
              filePreviewCallBack () {
                alert('阅读完成了')
              }
            })
            micro.microApp1 = loadMicroApp({ // 👈 挂载微应用
              name: 'xxx',
              entry: process.env.VUE_APP_commonViewer,
              container: '#microApp1',
              props: {
                name: 'xxx',
                shared  // 👈 share实例实例实现数据通讯
              }
            }, {
              sandbox: { // 👈 开启微应用之间的样式隔离
                experimentalStyleIsolation: true
              }
            })
          }
        }).catch(() => {
          message.error('网络异常，请稍后再试！')
        })
      }
    }

    return {
      loadSubPart,
      loadOtherSubPart,
      unMountPart,
      imgUrl: require('@images/logo.png')
    }
  }
})
</script>
```

