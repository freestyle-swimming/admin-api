import Service from '../foundation/Bases/Service';

export default class extends Service {
  async generate() {
    const { app } = this;
    const vid = this.ctx.helper.getRandNumber();
    const verify = (app as any).verifyCode.generate();
    await app.redis.setex(`verifyCode:${vid}`, 60, verify.code);
    return { id: vid, img: verify.image };
  }
  async verify(vid: number, code: string): Promise<boolean> {
    const id = `verifyCode:${vid}`;
    const res = await this.app.redis.get(id);
    // 不区分大小写
    if (res) return res.toUpperCase() === code.toUpperCase();
    return false;
  }
}
