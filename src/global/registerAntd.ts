import { App } from 'vue';
import { Button, Input } from 'ant-design-vue';

const components = [Button, Input];

export function registerAntd(app: App): void {
  components.forEach((component) => {
    app.use(component);
  });
}
