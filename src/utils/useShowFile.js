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
