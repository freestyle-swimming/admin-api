import Controller from '../foundation/Bases/Controller';

export default class extends Controller {
  // 登录
  async token() {
    const { username, password, verifyCode, vid } = this.post;
    this.ctx.validate({
      username: 'string',
      password: 'string',
      verifyCode: 'string',
      vid: 'number',
    });
    // 验证验证码
    const verify = await this.ctx.service.verify.verify(vid, verifyCode);
    if (!verify) return this.fail(9001, '验证码错误');
    const res = await this.ctx.service.user.findOne({
      mobile: username,
      password: this.ctx.helper.md5(password),
      status: 0,
    });
    if (res) {
      const token = await this.ctx.service.jwt.generateToken(res._id);
      return this.success(token);
    }
    return this.fail(401, '用户名或者密码错误');
  }
  // 登录验证码
  async verifyCode() {
  }
}
