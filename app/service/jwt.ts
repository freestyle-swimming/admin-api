import Service from '../foundation/Bases/Service';

export default class extends Service {
  async generateToken(userId: string) {
    const token = this.app.jwt.sign({ userId }, this.app.config.jwt.secret);
    const shortToken = this.ctx.helper.md5(token);
    const id = `tokens:${shortToken}`;
    const expire = this.config.jwtExpire;
    const tokenCfo = { token: shortToken, userId, expire };
    await this.app.redis.setex(id, expire, JSON.stringify(tokenCfo));
    return tokenCfo;
  }
  async getUserIdByToken(token: string) {
    const id = `tokens:${this.ctx.helper.md5(token)}`;
    const res = await this.app.redis.get(id);
    if (res) {
      return (JSON.parse(res)).userId;
    }
    return null;
  }
}
