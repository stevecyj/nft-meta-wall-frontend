const errorMessageEnum = {
  noContent: "沒有貼文內容，請填寫",
  imageSizeError: "圖片檔案過大，僅限 1mb 以下檔案",
  imageTypeError: "圖片格式錯誤，僅限 JPG、PNG 圖片",
};
let file = reactive({}); // 準備拿 input type="file" 的值
let fs = reactive({
  name: "", // input 的圖檔名稱
  thumbnail: null, // input 的圖片縮圖
  size: null, // input 的圖片大小
  unit: "KB",
});
let title = ref(""); // 圖片標題
let content = ref(""); // 貼文描述
let preViewImage = ref(null); // 圖片預覽
let errorImageMessageVised = ref(false);
let errorImageMessage = ref("");
let errorContentMessageVised = ref(false);
let errorContentMessage = ref("");
// 準備拿 input type="file" 的值
export const showFile = (e) => {
  file = e.target.files[0]; // input type="file" 的值
  fs.name = file.name; // input 的圖檔名稱
  fs.thumbnail = window.URL.createObjectURL(file); // input 的圖片縮圖
  fs.size = ~~(file.size * 0.001); // input 的圖片大小
  title.value = fs.name; // 預設 input 的圖檔名稱為圖片上傳時的圖片標題
  preViewImage.value = URL.createObjectURL(file);

  if (fs.size > 1000) {
    errorImageMessageVised.value = true;
    errorImageMessage.value = errorMessageEnum.imageSizeError;
  } else if (!imageTypeRule(fs.name)) {
    errorImageMessageVised.value = true;
    errorImageMessage.value = errorMessageEnum.imageTypeError;
  } else {
    errorImageMessageVised.value = false;
  }
};
