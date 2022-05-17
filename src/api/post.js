import request from '@/utils/request';

export function createPost(data) {
  return request({
    url: '/post',
    method: 'post',
    data
  })
}

export function getPosts(params) {
  return request({
    url: '/posts',
    method: 'get',
    params
  })
}