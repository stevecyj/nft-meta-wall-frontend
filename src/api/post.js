import request from '@/utils/request';

/** 取得所有貼文
 * @param {*} params ex：{ "keyword": "1", "timeSort": "asc", "limit": 10, "page": 1}
 * @returns 
 *  "status": "success",
 *  "message": "成功取得全部貼文",
 *  "data": { "count": 5, "limit": 10, "page": 1, "posts": [] }
 */
export function getPosts(params) {
  return request({
    url: '/posts',
    method: 'GET',
    params
  })
}

/** 取得指定 user 所有貼文
 * @param {*} userId 使用者 ID
 * @param {*} params ex：{ "keyword": "1", "timeSort": "asc", "limit": 10, "page": 1}
 * @returns
 *  "status": "success",
 *  "message": "取得指定 user 所有貼文",
 *  "data": { "count": 5, "limit": 10, "page": 1, "posts": [] }
 */
export function getUserPosts(userId, params) {
  return request({
    url: `/posts/user/${userId}`,
    method: 'GET',
    params
  })
}

/** 取得指定貼文
 * @param {*} postId 貼文 ID
 * @returns
 *  * "status": "success",
 *  "message": "成功取得指定貼文",
 *  "data": { ...貼文資料 }
 */
export function getPostById(postId) {
  return request({
    url: `/post/${postId}`,
    method: 'GET',
  })
}

/** 新增貼文
 * @param {*} data ex：{ "userId": "", "content": "test", "image": "" }
 * @returns
 *  "status": "success",
 *  "message": "成功新增貼文",
 *  "data": { ...貼文資料 }
 */
export function createPost(data) {
  return request({
    url: '/post',
    method: 'POST',
    data
  })
}

/** 新增指定貼文內留言
 * @param {*} postId 貼文 ID
 * @param {*} data ex：{ "userId": "", "comment": "test" }
 * @returns
 *  "status": "success",
 *  "message": "成功新增指定貼文內留言",
 *  "data": { ...貼文資料 }
 */
export function addPostComment(postId, data) {
  return request({
    url: `/post/${postId}/comments`,
    method: 'POST',
    data
  })
}

/** 修改指定貼文
 * @param {*} postId 貼文 ID
 * @param {*} data ex：{ "content": "test-123", "image": "test" }
 * @returns
 *  "status": "success",
 *  "message": "成功修改指定貼文",
 *  "data": { ...貼文資料 }
 */
export function updatePost(postId, data) {
  return request({
    url: `/post/${postId}`,
    method: 'PATCH',
    data
  })
}

/** 修改指定貼文按讚數
 * @param {*} postId 貼文 ID
 * @param {*} data ex：{ "userId": "" }
 * @returns
 *  "status": "success",
 *  "message": "成功修改指定貼文按讚數",
 *  "data": { ...貼文資料 }
 */
export function updatePostLikes(postId, data) {
  return request({
    url: `/post/${postId}/likes`,
    method: 'PATCH',
    data
  })
}

/** 刪除指定貼文
 * @param {*} postId 貼文 ID
 * @returns
 *  "status": "success",
 *  "message": "成功刪除指定貼文",
 *  "data": { ...貼文資料 }
 */
export function deletePost(postId) {
  return request({
    url: `/post/${postId}`,
    method: 'DELETE',
  })
}