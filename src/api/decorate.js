import request from '@/utils/request'
// 装饰设计新增
export function decorateAdd(params) {
  return request({
    url: '/project/design/adorn',
    method: 'post',
    data:params
  })
}
// 装饰设计详情
export function decorateDetail(params) {
  return request({
    url: '/project/design/adorn',
    method: 'get',
    params
  })
}

// 装饰设计列表
export function decorateList(params) {
  return request({
    url: '/project/design/adorn/queryList',
    method: 'get',
    params
  })
}
// 装饰设计编辑
export function decorateUpdate(params) {
  return request({
    url: '/project/design/adorn',
    method: 'PUT',
    data:params
  })
}
// 装饰设计删除
export function decorateDelete(params) {
  return request({
    url: '/project/design/adorn',
    method: 'DELETE',
    params
  })
}