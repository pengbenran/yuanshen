import request from '@/utils/request'
// 商品新增
export function GoodAdd(params) {
  return request({
    url: '/project/product/info',
    method: 'post',
    data:params
  })
}

// 商品删除
export function DeleteGood(params) {
  return request({
    url: '/project/product/info',
    method: 'DELETE',
    params
  })
}

//修改商品
export function UpdataGood(params) {
    return request({
      url: '/project/product/info',
      method: 'put',
      data:params
    })
  }

//获取商品列表
export function GoodList(params){
    return request({
        url: '/project/product/queryList',
        method: 'get',
        params
      })
}