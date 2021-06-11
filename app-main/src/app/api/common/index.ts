import { get, post } from '../http'
import { ToolsUtil } from '@/common/utils'

export const CommonApi = {
  getCommonData: function (data:any) { // {deviceType:194,isShowNum:true,remoteUser:'admin'}获取区域信息
    return get('/xxx', data)
  },
  /**
   * 获取机构信息
   */
  getInfo () {
    return post('sys/org/getByCode', {
      orgCode: ToolsUtil.getOrgCode()
    })
  }
}
