import dayjs from 'dayjs';

/** 解析為本地時間
 * @desc 解析為本地時間
 * @param {date} time - 時間物件資料
 * @return {string} - 本地時間
 */
export function timeToLocalTime(date) {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
}

/** 解析雨都下時間差幾天
 * @desc 解析為本地時間
 * @param {date} time - 時間物件資料
 * @return {string} - 本地時間
 */
export function timeDiffNowTime(date) {
  const today = new Date;
  const time = new Date(date);

  return dayjs(today).diff(time, 'day');
}