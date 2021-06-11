import { get } from '@/app/api'

export const ArchivesManageApi = {
  getXxxList () {
    // 便捷导航配置
    const url = '/xx'
    return get(url)
  }
}
