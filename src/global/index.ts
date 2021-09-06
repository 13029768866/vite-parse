import { App } from 'vue';
import { registerAntd } from './registerAntd';

export function globalRegister(app: App): void {
  registerAntd(app);
}
