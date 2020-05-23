import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/reply',
    method: 'get'
  })
}

export function remove(data) {
  return request({
    url: '/reply',
    method: 'delete',
    data
  })
}

export function update(data) {
  return request({
    url: '/reply',
    method: 'post',
    data
  })
}

