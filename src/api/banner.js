import request from '@/utils/request'
// banner新增
export function bannerAdd(params) {
  return request({
    url: '/project/other/banner',
    method: 'post',
    data:params
  })
}
// banner列表
export function bannerList(params) {
  return request({
    url: '/project/other/banner/queryList',
    method: 'get',
    params
  })
}
