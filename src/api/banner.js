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
// banner修改
export function bannerUpdate(params) {
  return request({
    url: '/project/other/banner',
    method: 'PUT',
    data:params
  })
}
// banner删除
export function bannerDele(params) {
  return request({
    url: '/project/other/banner',
    method: 'DELETE',
    params
  })
}
