import request from '@/utils/request'
// 设计师新增
export function desiginerAdd(params) {
  return request({
    url: '/project/product/designer',
    method: 'post',
    data:params
  })
}
// 设计师详情
export function desiginerDetail(params) {
  return request({
    url: '/project/product/designer',
    method: 'get',
    params
  })
}

// 设计师列表
export function desiginerList(params) {
  return request({
    url: '/project/product/designer/queryList',
    method: 'get',
    params
  })
}
// 设计师编辑
export function desiginerUpdate(params) {
  return request({
    url: '/project/product/designer',
    method: 'PUT',
    data:params
  })
}
// 设计师删除
export function desiginerDelete(params) {
  return request({
    url: '/project/product/designer',
    method: 'DELETE',
    params
  })
}


//装饰新增

export function adornAdd(params) {
  return request({
    url: '/project/design/adorn',
    method: 'post',
    data:params
  })
}