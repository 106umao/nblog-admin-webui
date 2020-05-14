import request from '@/utils/request'

export function login(data) {
  return request({
    // 此处修改了 login api
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // 此处修改了 getInfo api
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  // 服务器不做处理，直接返回true
  return new Promise(resolve => resolve(true))
  // return request({
  //   // 此处修改了 logout api
  //   url: '/logout',
  //   method: 'post'
  // })
}
