import Service from '../../baseClass/Service';

export default class extends Service {
  constructor(ctx, name) {
    super(ctx, name);
    this.name = 'permission';
  }
}