import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/oauth/login',
    method: 'post',
    data
  })
}

export function signup(data) {
  return request({
    url: '/oauth/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function getStatistics() {
  return request({
    url: '/resource-statistics',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/oauth/logout',
    method: 'post',
    data: {}
  })
}

export function refreshToken() {
  return request({
    url: '/oauth/refresh-token',
    method: 'get'
  })
}

export function postScenario(data) {
  return request({
    url: '/scenarios',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function getSystemConfigs() {
  return request({
    url: '/api/system-configs',
    method: 'get'
  })
}

export function postSystemConfigs(data) {
  return request({
    url: '/system-configs',
    method: 'post',
    data
  })
}

export function putSystemConfigs(id, data) {
  return request({
    url: `/system-configs/${id}`,
    method: 'put',
    data
  })
}