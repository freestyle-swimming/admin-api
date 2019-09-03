import { v1 as uuidv1, v4 as uuid } from 'uuid';
import { createHash } from 'crypto';

export default {
  uuidv1,
  uuid,
  // 转md5
  md5(str: string) {
    return createHash('md5').update(str, 'utf8').digest('hex');
  },
  // 生成一个随机数8位
  getRandNumber() {
    const rand = Math.random();
    return Math.floor(rand * 100000000);
  },
};
