import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/role',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}
