import request from '@/utils/request'
// 标签新增
export function kindAdd(params) {
  return request({
    url: '/project/product/item',
    method: 'post',
    data:params
  })
}