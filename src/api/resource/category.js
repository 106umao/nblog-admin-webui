import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/category',
    method: 'get'
  })
}

export function fetchDetail(id) {
  return request({
    url: '/category/detail',
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
    url: '/category',
    method: 'put',
    data
  })
}

export function update(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/category',
    method: 'delete',
    data
  })
}
