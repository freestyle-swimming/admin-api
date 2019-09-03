import Controller from '../foundation/Bases/Controller';

export default class extends Controller {
  async verifyCode() {
    const res = await this.service.verify.generate();
    return this.success(res);
  }
}
