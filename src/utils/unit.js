/** 數字千位數加上逗號
 * @desc 數字千位數加上逗號
 * @param {number} number - 欲加上千位數逗號的數字
 * @return {string} - 加上千位數逗號的字串
 */
export function thousandSeparator(number) {
  if (number === 0) {
    return '0';
  }

  return number
    .toString()
    .replace(/^0+/, '')
    .replace(/[^0-9]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
