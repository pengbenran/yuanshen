import request from '@/utils/request'
// 产品设计新增
export function decorateAdd(params) {
  return request({
    url: '/project/design/product',
    method: 'post',
    data:params
  })
}
// 产品设计详情
export function decorateDetail(params) {
  return request({
    url: '/project/design/product',
    method: 'get',
    params
  })
}

// 产品设计列表
export function productList(params) {
  return request({
    url: '/project/design/product/queryList',
    method: 'get',
    params
  })
}
// 产品设计编辑
export function decorateUpdate(params) {
  return request({
    url: '/project/design/product',
    method: 'PUT',
    data:params
  })
}
// 产品设计删除
export function decorateDelete(params) {
  return request({
    url: '/project/design/product',
    method: 'DELETE',
    params
  })
}