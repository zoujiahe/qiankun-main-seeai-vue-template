import { Observable } from 'rxjs'
import { Menu } from '../base/menus'
import { InjectionKey } from 'vue'
import { win } from '@/common/base/common'
import { post } from '@/app/api'
import Bus from './bus'
import { getMenuByUrl } from '@/common/utils/common'

declare const window: win

export class MenuService {
  private menuData: Menu[] = [];// 菜单数据
  private menuUrl='sys/menu/getUserMenus'; // 菜单接口
  private isLoadMenu: 'unload' | 'loading' | 'loaded' = 'unload'; // 菜单数据加载标志

  /**
   * @description 公共菜单跳转方法
   * @param routeParam {
   *   url        string  菜单数据pruelink
   *   paramUrl   string  路由参数
   *   title      string  顶部导航描述
   * }
   */
  gotoUrl (routeParam: { url: string; paramUrl: string; title?: string }) {
    const { url, paramUrl, title } = routeParam
    Bus.$emit('gotoUrl', url, paramUrl, title)
  }

  /**
   * @description 公共菜单返回
   * @param tabChange 是否自动高亮上一个tab,并联动左侧导航和跳转路由
   */
  goBack (tabChange = true) {
    Bus.$emit('gotoUrl', tabChange)
  }

  /**
   * @description 根据路由地址找到menu中的item，没有menu自动请求后台
   * @param url
   */
  getCurMenu (url: string): Observable<Menu> {
    return new Observable<any>((observe) => {
      if (this.isLoadMenu === 'loaded') {
        observe.next(getMenuByUrl(this.menuData, url))
        observe.unsubscribe()
      } else {
        this.loadMenus().subscribe(
          (result) => {
            observe.next(getMenuByUrl(this.menuData, url))
            observe.unsubscribe()
          },
          (error) => {
            console.log(error)
          }
        )
      }
    })
  }

  /**
   * @description 获取菜单数据
   */
  loadMenus (): Observable<any> {
    return new Observable<any>((observe) => {
      if (this.isLoadMenu === 'unload') {
        this.isLoadMenu = 'loading'
        post(this.menuUrl, { platformId: window.__platform__ })
          .then(
            (result) => {
              if (result.status === 200) {
                this.isLoadMenu = 'loaded'
                this.menuData = result.data.data
              } else {
                this.isLoadMenu = 'unload'
                this.menuData = []
              }
              observe.next(this.menuData)
              Bus.$emit('menuChange', this.menuData)
              observe.complete()
              observe.unsubscribe()
            },
            (error) => {
              observe.error(error)
              observe.unsubscribe()
            }
          )
      } else if (this.isLoadMenu === 'loading') {
        Bus.$on('menuChange', (menus: Menu[]) => {
          observe.next(menus)
          observe.complete()
          observe.unsubscribe()
        })
      } else {
        observe.next(this.menuData)
        observe.complete()
        observe.unsubscribe()
      }
    })
  }

  /**
   * @description 清空菜单
   */
  clear () {
    this.isLoadMenu = 'unload'
    this.menuData = []
  }
}

export const MenuServiceKey: InjectionKey<MenuService> = Symbol()
