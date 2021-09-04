import { App } from 'vue';
import { ElButton, ElInput } from 'element-plus';
import 'element-plus/theme-chalk/base.css';

const components = [ElButton, ElInput];

export function registerElement(app: App): void {
  components.forEach((component) => {
    app.use(component);
  });
}
