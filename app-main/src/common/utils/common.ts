import { app } from '@/main'

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
