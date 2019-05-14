import request from '@/utils/request'
// 标签新增
export function labelAdd(params) {
  return request({
    url: '/project/labels',
    method: 'post',
    data:params
  })
}
// }标签列表
export function labelList() {
  return request({
    url: '/project/labelList',
    method: 'get',
  })
}
// 标签删除
export function labelDel(params) {
  return request({
    url: '/project/labels',
    method: 'DELETE',
    params
  })
}
// 标签编辑
export function labelUpdate(params) {
  return request({
    url: '/project/labels',
    method: 'PUT',
    data:params
  })
}