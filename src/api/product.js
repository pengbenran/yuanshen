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
export function productList(params,itemId) {
  return request({
    url: '/project/design/product/queryList/'+itemId,
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

// 产品中心分类添加
export function PItemAdd(params) {
  return request({
    url: '/project/design/item/product',
    method: 'post',
    data:params
  })
}

// 产品中心分类获取
export function PItemList(params) {
  return request({
    url: '/project/design/item/product/queryList',
    method: 'get',
    params
  })
}

// 产品中心分类修改
export function PItemEdit(params) {
  return request({
    url: '/project/design/item/product',
    method: 'PUT',
    data:params
  })
}

// 产品中心分类删除
export function PItemDelete(params) {
  return request({
    url: '/project/design/item/product',
    method: 'DELETE',
    params
  })
}