import request from '@/utils/request'
//新闻新增
export function NewsAdd(params) {
  return request({
    url: '/project/center/news',
    method: 'post',
    data:params
  })
}
// 新闻删除
export function NewsDelete(params) {
  return request({
    url: '/project/center/news',
    method: 'DELETE',
    params
  })
}
//获取公司新闻列表
export function NewsList(params){
    return request({
        url: '/project/center/newsListByStyle',
        method: 'get',
        params
      })
}
//获取公司新闻详情
export function NewsDetail(params){
    return request({
        url: '/project/center/news',
        method: 'get',
        params
      })
}
//公司新闻编辑
export function NewsUpdate(params){
    return request({
        url: '/project/center/news',
        method: 'put',
        data:params
      })
}