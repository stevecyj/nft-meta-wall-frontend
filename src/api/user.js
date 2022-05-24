import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/users/sign_in",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function register(data) {
  return request({
    url: "/users/sign_up",
    method: "post",
    data,
  });
}

export function getProfile(id) {
  return request({
    url: `/users/profile/${id}`,
    method: "get",
  });
}
<<<<<<< HEAD

export function updatePassword(data) {
  return request({
    url: "/users/updatePassword",
    method: "post",
    data,
  });
}
=======
>>>>>>> 2d57a37 (feat. get profile,show avatar)
