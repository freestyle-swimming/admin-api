import Controller from '../foundation/Bases/Controller';

export default class extends Controller {
  async baseInfo() {
    const user = this.ctx.state.user;
    return this.success(user);
  }
}
