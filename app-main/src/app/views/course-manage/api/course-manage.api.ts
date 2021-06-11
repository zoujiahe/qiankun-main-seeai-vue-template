import { get } from '@/app/api'

export const CourseManageApi = {
  getXxxList () {
    // 便捷导航配置
    const url = '/xx'
    return get(url)
  }
}
