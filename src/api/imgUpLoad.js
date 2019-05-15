import request from '@/utils/request'
// banner新增
export function imageUpload(params) {
  return request({
    url: '/project/uploadImg',
    method: 'post',
    data:params
  })
}