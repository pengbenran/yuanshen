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

//获取所有的根级分类
export function GetRootList(params) {
  return request({
    url: '/project/product/getRootItems',
    method: 'get',
    data:params
  })
}

//指定父级获取分类
export function GetRootParent(params) {
  return request({
    url: '/project/product/getItemsByParentId',
    method: 'get',
    params
  })
}

// 查看分类详细信息
export function getKindDetail(params) {
  return request({
    url: '/project/product/item',
    method: 'get',
    params
  })
}


