import { Context } from 'egg';
import Service from '../foundation/Bases/Service';

export default class extends Service {
  constructor(ctx: Context, name: string) {
    super(ctx, name);
    this.name = 'user';
  }
}
