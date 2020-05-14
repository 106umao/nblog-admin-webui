import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/comment',
    method: 'get'
  })
}

export function fetchDetail(id) {
  return request({
    url: '/comment/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/comment/create',
    method: 'put',
    data
  })
}

export function update(data) {
  return request({
    url: '/comment/status',
    method: 'post',
    data
  })
}
