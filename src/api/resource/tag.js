import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/tag',
    method: 'get'
  })
}

export function fetchDetail(id) {
  return request({
    url: '/tag/detail',
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
    url: '/tag/create',
    method: 'put',
    data
  })
}

export function update(data) {
  return request({
    url: '/tag/status',
    method: 'post',
    data
  })
}
