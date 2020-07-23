/**
 * 判断音乐是否可以播放
 * @param {Object} privileges 原始字符串
 * @returns {Boolean}
 */
export const checkMusic = privilege => {
  return (
    privilege.st !== -1 && privilege.st !== -200 && privilege.fee !== 1 && privilege.fee !== 4 && privilege.fee !== 16
  );
};

/**
 * 数组分片，当数组长度超过step时，以step为步长分片数组
 * @param {Array} arr
 * @param {Number} step 分片步长
 */
export const arraySplit = (arr, step = 20) => {
  const len = arr.length;
  const rec = [];
  if (len <= step) {
    return [arr];
  }
  for (let i = 0; i < len; i += step) {
    rec.push(arr.slice(i, i + step));
  }
  return rec;
};
