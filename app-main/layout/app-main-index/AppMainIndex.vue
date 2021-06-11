<template>
  <a-layout id='components-layout-demo-custom-trigger'>
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light" :trigger="null">
      <div class='logo-container'>
        <div class="logo" :style='logo'/>
      </div>
      <a-menu theme="light"
              @select='menuClick'
              class='main-menu'
              v-model:selectedKeys="selectedKeys"
              mode="inline"
              :default-open-keys="defaultOpenKeys"
              :default-selected-keys="defaultSelectedKeys">
        <template v-for="item in menus">
          <template v-if="!item.children && item.isVisible ==='1'">
            <a-menu-item :key="item.link || item.text" :style='{paddingLeft:`${item.level*15}px`}' :title='item.text'>
              <menu-icon :icon='item.icon'></menu-icon>
              <span>{{ item.text }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :menu-info="item" :key="item.link || item.text"/>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #1890ff;padding: 0;">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent
             style='color: white;vertical-align:middle;float: right;padding-right:20px;'>
            <a-avatar size="small">
              <template #icon>
                <UserOutlined/>
              </template>
            </a-avatar>
            {{userInfo.nickName}}
          </a>
          <template #overlay>
            <a-menu @click='handleMenuClick'>
              <a-menu-item key="0">
                <PoweroffOutlined/>
                退出登录
              </a-menu-item>
              <a-menu-item key="1">
                <SettingOutlined/>
                修改密码
              </a-menu-item>
              <a-menu-divider/>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>

        <a-tabs v-model:activeKey="tabIndex" hide-add type="editable-card" @edit="closeTab" class="main-tabs"
                @change='tabChange'>
          <a-tab-pane v-for="(pane ,i) of tabs" :key="pane.link || pane.text" :closable="true">
            <template #tab>
              <a-tooltip title='请选中标题再进行推拽' :mouseEnterDelay='3'>
                <li class='pane-text'
                    @contextmenu='contextMenu($event,i)'
                    @dragenter="dragenter($event, i)"
                    @dragover="dragover($event, i)"
                    @dragstart="dragstart(i)"
                    :key="pane.link || pane.text"
                    draggable
                >{{pane.text}}
                </li>
              </a-tooltip>
            </template>
          </a-tab-pane>
        </a-tabs>

      <div id="menu-tab" ref='rightMenu'>
        <div class='menu-item' @click='closeTabs()'>关闭所有</div>
        <div class='menu-item' @click='closeTabs("other")'>关闭其他</div>
        <div class='menu-item' @click='closeTabs("right")'>关闭右侧</div>
        <div class='menu-item' @click='closeTabs("left")'>关闭左侧</div>
      </div>
      <a-layout-content
        class='main-content'
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onUnmounted } from 'vue'
import { useRequiredInject } from '@/common/hooks'
import { Bus, MenuServiceKey } from '@/common/services'
import { Menu } from '@/common/base'
import { message } from 'ant-design-vue'
import { mapGetters, useStore } from 'vuex'
import {
  comparePath,
  getPureLink, gotoReview,
  isUrlEqMenu,
  LocalStorageUtil,
  restoreMenus, SessionStorageUtil,
  storeMenus
} from '@/common/utils'
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router'
import { MenuState, useMenus } from './hooks/useMenus'

export interface MenuTabsState extends MenuState {
    tabs: Menu[];
    tabIndex: string;
    currentTabIndex: string;
    collapsed: boolean;
  }

export default defineComponent({
  name: 'app-main-index',
  async setup () {
    const rightMenu = ref<HTMLDivElement | null>(null)
    const userInfo = LocalStorageUtil.getUser()
    const store = useStore()
    const router: Router = useRouter()
    const route: RouteLocationNormalizedLoaded = useRoute()
    const menuService = useRequiredInject(MenuServiceKey)
    let dragIndex = -1
    let enterIndex = -1
    onUnmounted(() => {
      Bus.$off('gotoUrl')
      Bus.$off('routerChange')
      Bus.$off('goBack')
    })
    const { defaultOpenKeys, defaultSelectedKeys, selectedKeys, menus, openKeys } = await useMenus()
    const state = reactive<MenuTabsState>({
      tabIndex: '',
      currentTabIndex: '',
      tabs: restoreMenus(),
      collapsed: false,
      selectedKeys,
      openKeys,
      defaultOpenKeys,
      defaultSelectedKeys,
      menus
    })

    const dragstart = (index) => {
      dragIndex = index
    }
    const dragenter = (e, index) => {
      e.preventDefault()
      e.stopPropagation()
      if (dragIndex !== index) {
        if (enterIndex !== index) {
          const moving = state.tabs[dragIndex]
          state.tabs.splice(dragIndex, 1)
          state.tabs.splice(index, 0, moving)
          storeMenus(state.tabs)
          dragIndex = index
        } else {
          enterIndex = index
        }
      }
    }
    const dragover = (e, index) => {
      e.stopPropagation()
      e.preventDefault()
    }
    /**
       * @description 退出登录
       * */
    const loginOut = () => {
      LocalStorageUtil.removeTkToken()
      LocalStorageUtil.removeUser()
      SessionStorageUtil.clear()
      store.commit('resetState')
      menuService.clear()
      gotoReview('login')
    }
    /**
     * @description 菜单点击
     * */
    const handleMenuClick = (e) => {
      if (e.key === '0') {
        loginOut()
      } else if (e.key === '1') {
        Bus.$emit('gotoUrl', '/m/system/admin-security', '', '修改密码')
      }
    }

    /**
       * @description 关闭当前tab
       * @param tabChange 是否自动高亮上一个tab,并联动左侧导航和跳转路由
       * */
    const goBack = (tabChange?) => {
      closeTab(state.tabIndex, 'remove', tabChange)
    }

    /**
       * @description 公共跳转菜单方法
       * @param link string 菜单数据pruelink
       * @param params string  路由参数
       * @param title string 顶部导航描述
       **/
    const gotoUrl = (link: string, params: string, title?: string) => {
      let index = -1
      for (let i = 0; i < state.tabs.length; i++) {
        const item = state.tabs[i]
        const pureLink = getPureLink(item.link!)
        if (pureLink !== '' && comparePath(pureLink, link)) {
          if (title) {
            item.text = title
          }
          index = i
          break
        }
      }
      if (index < 0) {
        menuService.getCurMenu(link).subscribe(
          (result) => {
            if (result.link) {
              const curMenu: Menu = Object.assign({}, result)
              if (title) {
                curMenu.text = title
              }
              addTab(curMenu)
              storeMenus(state.tabs)
              tabChange(state.tabIndex, link + params)
            } else {
              message.warning('该跳转路由无权限，请到总控台新增全权限！')
            }
          }
        )
      } else {
        state.tabIndex = state.tabs[index].link!
      }
    }

    /**
       * @description 增加tab，设置tab选中(根据前一个选中的tab取下一个)
       * @param menu
       */
    const addTab = (menu: Menu) => {
      const seq = state.tabs.findIndex(tab => tab.link === state.tabIndex)
      const idx = seq === -1 ? 0 : seq + 1
      state.tabs.splice(idx, 0, {
        link: menu.link,
        text: menu.text
      })
      state.tabIndex = menu.link!
    }

    /**
       * @description 关闭顶部导航
       * @param targetKey 当前tab的key
       * @param action 动作类型
       * @param changeTab 是否进行切换高亮顶部、侧边tab+跳转路由
       */
    const closeTab = (targetKey: string, action = 'remove', changeTab = true): boolean => {
      let index = -1
      for (let i = 0; i < state.tabs.length; i++) {
        const item = state.tabs[i]
        if (item.link === targetKey) {
          index = i
          break
        }
      }
      if (index > -1) {
        const preKey = state.tabs[index - 1]?.link
        const afterKey = state.tabs[index + 1]?.link
        state.tabs.splice(index, 1)
        storeMenus(state.tabs)
        if (changeTab) {
          if (state.tabs.length > 0) {
            if (state.tabIndex === targetKey) {
              state.tabIndex = preKey! || afterKey!
              tabChange(state.tabIndex || afterKey!)
            }
          } else {
            state.tabIndex = ''
            router.push('/m/empty')
          }
        }
      }
      return false
    }

    /**
       * @description 批量关闭顶部导航
       **/
    const closeTabs = (limit?) => {
      const tabs: Menu[] = []
      switch (limit) {
        case 'other' :
          if (state.tabs.length === 1) {
            return
          }
          // state.tabs.forEach((e, i) => {
          //   if (e.link !== state.currentTabIndex) {
          //     // this.delReuseRoute(e.realLink);
          //   }
          // });
          state.tabs = state.tabs.filter(item => item.link === state.currentTabIndex)
          if (state.tabIndex !== state.currentTabIndex) {
            router.push({
              path: getPureLink(state.currentTabIndex)
            })
            state.tabIndex = state.currentTabIndex
            state.selectedKeys = [state.currentTabIndex]
          }
          break
        case 'left' :
          const tabIndexLeft = state.tabs.findIndex(tabL => tabL.link === state.currentTabIndex)
          if (tabIndexLeft === 0) {
            return
          }
          const tabIndexLi = state.tabs.findIndex(tabLi => tabLi.link === state.tabIndex)
          state.tabs.forEach((tabLeft, i) => {
            if (i < tabIndexLeft) {
              // this.delReuseRoute(e.realLink);
            } else {
              tabs.push(tabLeft)
            }
          })
          if (tabIndexLi < tabIndexLeft) {
            router.push({
              path: getPureLink(state.currentTabIndex)
            })
            state.tabIndex = state.currentTabIndex
            state.selectedKeys = [state.currentTabIndex]
          }
          state.tabs = tabs
          break
        case 'right' :
          const tabIndexRight = state.tabs.findIndex(tabL => tabL.link === state.currentTabIndex)
          if (tabIndexRight === state.tabs.length - 1) {
            return
          }
          const tabIndexRi = state.tabs.findIndex(tabRi => tabRi.link === state.tabIndex)
          state.tabs.forEach((tabRight, i) => {
            if (i > tabIndexRight) {
              // this.delReuseRoute(e.realLink);
            } else {
              tabs.push(tabRight)
            }
          })
          if (tabIndexRi > tabIndexRight) {
            router.push({
              path: getPureLink(state.currentTabIndex)
            })
            state.tabIndex = state.currentTabIndex
            state.selectedKeys = [state.currentTabIndex]
          }
          state.tabs = tabs
          break
        default :
          // state.tabs.forEach((e, i) => {
          //   // this.delReuseRoute(e.realLink);
          // })
          state.tabs = []
      }
      storeMenus(state.tabs)
      if (rightMenu.value && rightMenu.value.style) {
        rightMenu.value.style.display = 'none'
      }
      if (!limit) {
        state.tabIndex = ''
        state.selectedKeys = []
        router.push({
          path: '/m/empty'
        })
      }
    }

    /**
       * @description 路由匹配缓存中的菜单,根据当前路由设置顶部和侧边导航高亮，跳转路由
       **/
    const setCurMenuLight = (path: string) => {
      let index = -1
      for (let i = 0; i < state.tabs.length; i++) {
        const item = state.tabs[i]
        const pureLink = getPureLink(item.link!)
        if (pureLink !== '' && comparePath(pureLink, path)) {
          index = i
          break
        }
      }
      if (index > -1) {
        state.tabIndex = state.tabs[index].link!
        tabChange(state.tabIndex)
      } else {
        state.tabIndex = ''
        state.selectedKeys = []
      }
    }

    /**
       * @description 左侧导航点击，跳转路由，高亮顶部导航
       * @param menu
       */
    const menuClick = (menu) => {
      let index = -1
      for (let i = 0; i < state.tabs.length; i++) {
        const item = state.tabs[i]
        if (item.link === menu.key) {
          index = i
          break
        }
      }
      if (index < 0) {
        addTab({
          link: menu.key,
          text: menu.item.title
        })
        storeMenus(state.tabs)
        tabChange(state.tabIndex)
      } else {
        state.tabIndex = state.tabs[index].link!
        router.push({
          path: getPureLink(state.tabs[index].link!)
        })
      }
    }

    /**
       * @description顶部导航点击，跳转路由，高亮左侧导航
       * @param key
       */
    const tabChange = (key: string, url?) => {
      router.push({
        path: url || getPureLink(key)
      })
      state.selectedKeys = [key]
    }

    /**
       * @description 顶部导航呼出右键菜单
       **/
    const contextMenu = (e: MouseEvent, index: number) => {
      state.currentTabIndex = state.tabs[index].link!
      const oX = e.clientX
      const oY = e.clientY
      if (rightMenu.value && rightMenu.value.style) {
        rightMenu.value.style.display = 'block'
        rightMenu.value.style.top = oY + 'px'
        rightMenu.value.style.left = oX + 'px'
      }
      const hideMenu = (event: Event) => {
        if (rightMenu.value && rightMenu.value.style) {
          rightMenu.value.style.display = 'none'
        }
        event.stopPropagation()
        event.preventDefault()
      }
      document.removeEventListener('click', hideMenu)
      document.addEventListener('click', hideMenu)
      e.stopPropagation()
      e.preventDefault()
    }

    /**
       * @description 初始化检查menu和路由匹配关系，isOpenTab为存在标识，存在自动添加顶部导航
       * */
    const initBaseOpenTab = (menuList: Menu[], link: string): boolean => {
      let isOpenTab = false
      if (menuList) {
        menuList.every(item => {
          if (!isOpenTab) {
            if (isUrlEqMenu(item.link!, link)) {
              addTab(item)
              isOpenTab = true
            } else if (item.children && item.children.length > 0) {
              if (initBaseOpenTab(item.children, link)) {
                isOpenTab = true
              }
            }
            return true
          }
        })
      }
      return isOpenTab
    }

    /**
       * @description 根据浏览器地址，初始化顶部导航和侧边导航，跳转路由
       * */
    const initMenuTab = () => {
      if (state.tabs.length === 0) {
        if (initBaseOpenTab(state.menus, route.path)) {
          state.tabIndex = state.tabs[0].link!
          tabChange(state.tabIndex)
        } else {
          // 跳转到无权访问页面
        }
      } else {
        setCurMenuLight(route.path)
      }
    }

    initMenuTab()

    /**
       * 监听路由更改，同步顶部和侧边导航状态（用来解决直接点击返回不会触发同步）
       */
    Bus.$on('routerChange', () => {
      initMenuTab()
    })
    /**
       * 监听菜单服务返回
       */
    Bus.$on('goBack', (tabChange?) => {
      goBack(tabChange)
    })
    /**
       * 监听菜单跳转
       */
    Bus.$on('gotoUrl', (link: string, params: string, title?: string) => {
      gotoUrl(link, params, title)
    })

    const handleClick = () => {
      console.log(111)
    }

    return {
      logo: { backgroundImage: `url(${require('@/assets/images/logo_hengqi.png')})` },
      ...toRefs(state),
      menuClick,
      tabChange,
      closeTab,
      closeTabs,
      contextMenu,
      rightMenu,
      handleMenuClick,
      userInfo,
      dragstart,
      dragover,
      dragenter,
      handleClick
    }
  }
})
</script>
<style lang='scss'>

  #menu-tab {
    position: fixed;
    left: 100px;
    top: 0;
    display: none;
    background: white;
    z-index: 999;
    box-shadow: 0 0 10px gray;
    border-radius: 5px;

    .menu-item {
      padding: 0px 6px;
      font-size: 14px;
      text-align: center;
      line-height: 26px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        color: white;
        background-color: #2296ff;
        border: 1px solid #d9d9d9;
      }
    }
  }

  #components-layout-demo-custom-trigger {
    height: 100%;

    .logo-container {
      height: 64px;

      .logo {
        height: 64px;
        background-color: #1890ff !important;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: left;
        margin: 0;
      }
    }

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
      float: left;
      padding-left: 20px !important;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .main-content {
    margin: 0 16px 20px;
    padding: 24px;
    background: #fff;
    position: relative;
    max-height:100%;
    overflow:auto;
  }

  .main-menu {
    .ant-menu-item-selected {
      background-color: #e6f7ff;
    }

    .ant-menu-submenu-title, .ant-menu-item {
      text-align: left;
    }
  }

  .main-tabs {
    .ant-tabs-bar {
      margin: 15px;

      .ant-tabs-nav-scroll {
        text-align: left;

        .ant-tabs-tab {
          padding-left: 0;
          transition: all 0.3s;
          &:hover {
            transform: translateY(-5px);
          }
          .pane-text {
            display: inline-block;
            padding-left: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
