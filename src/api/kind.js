import request from '@/utils/request'
// 分类添加
export function kindAdd(params) {
  return request({
    url: '/project/product/item',
    method: 'post',
    data:params
  })
}

//分类列表
export function GetList(params) {
  return request({
    url: '/project/product/itemList',
    method: 'get',
    data:params
  })
}

//分类删除
export function DeleteList(params) {
  return request({
    url: '/project/product/item',
    method: 'delete',
    params
  })
}

//分类修改
export function UpdataList(params) {
  return request({
    url: '/project/product/item',
    method: 'put',
     data:params
  })
}