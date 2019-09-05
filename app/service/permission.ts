import Service from '../foundation/Bases/Service';

export default class extends Service {
  constructor(ctx, name) {
    super(ctx, name);
    this.name = 'permission';
  }
}
