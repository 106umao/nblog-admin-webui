import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/comment',
    method: 'get'
  })
}

export function remove(data) {
  return request({
    url: '/comment',
    method: 'delete',
    data
  })
}
