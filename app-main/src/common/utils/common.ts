import { app } from '@/main'
import { SessionStorageUtil } from '@/common/utils/sessionstorage.util'
import { Menu } from '@/common/base'
import { MicroApp } from 'qiankun'

export function loadScript (src) {
  const headElement = document.head || document.getElementsByTagName('head')[0]

  return new Promise((resolve, reject) => {
    if (src in app.config.globalProperties.importedScript) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.type = 'text/javascript';
    (script as any).ignore = true
    script.onerror = () => {
      headElement.removeChild(script)
      reject(new URIError(`The Script ${src} is no accessible.`))
    }
    script.onload = () => {
      app.config.globalProperties.importedScript[src] = true
      resolve(true)
    }
    headElement.appendChild(script)
    script.src = src
  })
}

export function serialPromises2 (promises, fn?) {
  if (!Array.isArray(promises)) {
    return
  }
  const process = (idx) => {
    const curr = promises[idx]
    // next 需要能够接收参数
    const next = function (res) {
      // 基于递归实现promise的串行
      process(++idx)
    }
    if (curr) {
      curr.then(next).catch(next)
    } else {
      fn && fn()
    }
  }
  process(0)
}

export function limitNumberInRange (val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

export function getPercent (min: number, max: number, val: number): number {
  return ((val - min) / (max - min)) * 100
}

// 取[min, max]之间的一个随机数
export function getRandomInt (range: [number, number]): number {
  return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0])
}

export function shuffle<T> (arr: T[]): T[] {
  const result = arr.slice()
  for (let i = 0; i < result.length; i++) {
    // 0和i 之间的一个随机数
    const j = getRandomInt([0, i]);

    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function getFileThumbUrl (type: string): string {
  let thumbUrl = ''
  if (
    type === 'application/msword' ||
    type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    type === 'doc' ||
    type === 'docx' || type === 'zip' || type === 'rar'
  ) {
    thumbUrl = process.env.VUE_OSS_URL + '/common/doc.png'
  } else if (
    type === 'application/vnd.ms-excel' ||
    type === 'application/x-xls' ||
    type ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    type === 'xls' ||
    type === 'xlsx'
  ) {
    thumbUrl = process.env.VUE_OSS_URL + '/common/excel.png'
  } else if (
    type === 'application/x-ppt' ||
    type === 'application/vnd.ms-powerpoint' ||
    type ===
    'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    type === 'ppt' ||
    type === 'pptx'
  ) {
    thumbUrl = process.env.VUE_OSS_URL + '/common/ppt.png'
  } else if (type === 'application/pdf' || type === 'pdf') {
    thumbUrl = process.env.VUE_OSS_URL + '/common/pdf.png'
  } else if (type === 'video/mp4' || type === 'mp4' || type === 'webm' || type === 'ogg') {
    thumbUrl = process.env.VUE_OSS_URL + '/common/video.png'
  }
  return thumbUrl || process.env.VUE_OSS_URL + '/common/video.png'
}

/**
 * 转换帕斯卡
 * @param str
 */
export function toCamelCase (str) {
  if (str) {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  }
}

/**
 * 转换小驼峰
 * @param str
 */
export function camelCase (str) {
  const s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

/**
 * @description 去除参数位和查询位
 * @param link
 * @return string
 * @example "/m/scp/prepare-course/:id/:name/:courseId/:professionId/:status?text=1" => "/m/scp/prepare-course"
 * @example "/m/scp/prepare-course/?text=1" => "/m/scp/prepare-course/?text=1"
 * @example "/m/scp/prepare-course?text=1" => "/m/scp/prepare-course?text=1"
 */
export function getPureLink (link: string): string {
  return link.replace(/\/:.+(\/)?/g, '')
}

/**
 * @description 截去参数位和查询位，保留最后/
 * @param str
 * @example "/m/scp/prepare-course/:id/:name/:courseId/:professionId/:status?text=1" => "/m/scp/prepare-course/"
 * @example "/m/scp/prepare-course" => "/m/scp/prepare-course"
 */
export function getNoParamUrl (str: string): string {
  const idx = str.indexOf('/:')
  return idx === -1 ? str : str.substr(0, idx + 1)
}

/**
 * @description 宽判断路由地址和菜单数据地址是否相等
 * @param menuUrl 菜单数据的url
 * @param url 路由地址-router.path-没有查询参数
 */
export function isUrlEqMenu (menuUrl: string, url: string): boolean {
  if (menuUrl === '') {
    return false
  }
  /**
   * originMenuUrl可能不以/结尾，实现目的：
   * (/test/:id)转originMenuUrl:(/test/)匹配路由(/test/或/test/1)
   * (/test)转originMenuUrl:(/test)匹配路由(/test/或/test)
   * 即 originMenuUrl.length <= url.length恒成立
   */
  let originMenuUrl = getNoParamUrl(menuUrl)

  /**
   * originMenuUrl.length === url.length
   * (/test)转(/test) === (/test)
   * todo: (/test/:id)转(/test/) === (/test/) 匹配到了空参
   */
  if (originMenuUrl === url) {
    return true
    /**
     * originMenuUrl.length < url.length
     * 兼容参数的匹配,这种菜单路由/test兼容可以和地址路由/test/匹配
     * 如菜单路由/test/a:1转为(/test/) === 地址路由(/test/2) => startsWith的作用
     * 如菜单路由/test转为(/test/) === 地址路由(/test/)
     */
  } else if (originMenuUrl.length < url.length) {
    if (originMenuUrl[originMenuUrl.length - 1] !== '/') {
      originMenuUrl += '/'
    }
    if (url.startsWith(originMenuUrl)) {
      return true
    }
  }

  return false
}

/**
 * @description 去除查询对比路由地址相等
 * @param purePath 菜单路由获取纯哈希地址，不会有查询参数
 * @param urlPath 普通路由地址
 * @example /m/test === /m/test
 * @example /m/test === /m/test/
 * @example /m/test === /m/test?zz=1
 * @example /m/text !== /m/test
 */
export const comparePath = (purePath: string, urlPath: string) => {
  const pureArr = purePath.split('/')
  const urlArr = urlPath.split('?')[0].split('/')
  if (pureArr.length > urlArr.length) {
    return false
  }
  let isOk = true
  for (let i = 0; i < pureArr.length; i++) {
    if (pureArr[i] !== urlArr[i]) {
      isOk = false
      break
    }
  }
  return isOk
}

/**
 * @description 根据pureLink找到menu中的item
 * @param menus
 * @param url 对路由地址getPureLink后的pureLink
 */
export function getMenuByUrl (menus: Menu[], url: string): Menu | null {
  let tempMenu: Menu | null = null
  for (const menu of menus) {
    if (getPureLink(menu.link!) === url) {
      tempMenu = menu
      break
    } else if (menu.children && menu.children.length > 0) {
      const menuChildren = getMenuByUrl(menu.children!, url)
      if (menuChildren !== null) {
        tempMenu = menuChildren
        break
      }
    }
  }
  return tempMenu
}

export const storeMenus = (menus: Menu[]): void => {
  SessionStorageUtil.putMenus(menus)
}

export const restoreMenus = (): Menu[] => {
  return SessionStorageUtil.getMenus()
}

export const microhandler = (next) => {
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
export const gotoReview = (path) => {
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
