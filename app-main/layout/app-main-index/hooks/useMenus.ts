import { useRequiredInject } from '@/common/hooks'
import { MenuServiceKey } from '@/common/services'
import { Menu } from '@/common/base'
export interface MenuState {
  selectedKeys: string[];
  openKeys: string[];
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
  menus: Menu[]
}
export async function useMenus () {
  const state:MenuState = {
    menus: [],
    defaultOpenKeys: [],
    openKeys: [],
    selectedKeys: [],
    defaultSelectedKeys: []
  }
  const menuService = useRequiredInject(MenuServiceKey)
  const menus: Menu[] = state.menus = await menuService.loadMenus().toPromise()
  if (menus && menus.length) {
    menus.every(menu => {
      if (menu.children && menu.children.length) {
        return menu.children.every(item => {
          if (item.link) {
            state.openKeys = [menu.link || menu.text!]
            state.defaultOpenKeys = [menu.link || menu.text!]
            // state.selectedKeys = [item.link || menu.text!]
            // state.defaultSelectedKeys = [item.link || menu.text!]
          } else {
            return true
          }
        })
      } else {
        return true
      }
    })
  }
  return state
}
