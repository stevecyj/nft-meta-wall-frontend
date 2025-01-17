/** 暱稱驗證
 * @desc 暱稱驗證
 * @param { nickname } string - nickname text
 * @return { boolean } boolean - 判斷是否符合規則或不符合規則的訊息
 */
export const nicknameRule = (nickname) => {
  return nickname.length >= 2;
};

/** 電子郵件驗證
 * @desc 電子郵件驗證
 * @param { email } string - email text
 * @return { boolean } boolean - 判斷是否符合規則或不符合規則的訊息
 */
export const emailRule = (email) => {
  return /.+@.+\..+/.test(email);
};

/** 密碼驗證
 * @desc 密碼驗證
 * @param { password } string - password text
 * @return { boolean } boolean - 判斷是否符合規則或不符合規則的訊息
 */
export const passwordRule = (password) => {
  return /^((?=\S*?[A-Za-z])(?=\S*?[0-9]).{7,})\S$/.test(password);
};

/** 圖片格式驗證
 * @desc 密碼驗證
 * @param { filename } string - image test
 * @return { boolean } boolean - 驗證通過回傳 true, 否則 false
 */
export const imageTypeRule = (filename)=> {
  return /\.(jpg|png|JPG|PNG|jpeg)$/.test(filename);
}
