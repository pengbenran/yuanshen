import request from '@/utils/request'
//新闻新增
export function newsAdd(params) {
  return request({
    url: '/project/center/news',
    method: 'post',
    data:params
  })
}

// 新闻删除
export function DeleteNew(params) {
  return request({
    url: '/project/center/news',
    method: 'DELETE',
    params
  })
}

//修改新闻
export function UpdataNew(params) {
    return request({
      url: '/project/center/news',
      method: 'put',
      data:params
    })
  }

//获取商品列表
// export function GoodList(params){
//     return request({
//         url: '/project/product/queryList',
//         method: 'get',
//         data:params
//       })
// }