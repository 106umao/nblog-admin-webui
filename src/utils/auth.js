import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

// 此处修改持久化存储钟的token key
const TokenKey = 'Authorizationn Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function listRoleByToken(token) {
  const user = jwt.decode(token).user
  const roles = JSON.parse(user).roles
  return formatRoles(roles)
}

export function formatRoles(oldRoles) {
  const newRoles = []
  for (let index = 0; index < oldRoles.length; index++) {
    const element = oldRoles[index]
    newRoles[index] = element.name
  }
  return newRoles
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
