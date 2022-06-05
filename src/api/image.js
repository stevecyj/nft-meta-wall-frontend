import axios from "axios";
import request from "@/utils/request";

const imgurURL = "https://api.imgur.com/3/image";

export function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file.file);
  formData.append("title", file.title);
  formData.append("description", file.content);
  formData.append("album", import.meta.env.VITE_BASE_IMGUR_ALBUM);

  let settings = {
    method: "post",
    url: imgurURL,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BASE_IMGUR_TOKEN}`,
    },
    data: formData,
  };

  return axios(settings);
}

export function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("image", file.file);
  formData.append("title", file.title);
  formData.append("description", file.content);
  return request({
    url: "/upload/image",
    method: "post",
    data: formData,
  });
}
