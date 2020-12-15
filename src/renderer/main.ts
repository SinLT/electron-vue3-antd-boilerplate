import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.min.css';
import antd from 'ant-design-vue';

createApp(App as any)
    .use(antd)
    .mount('#app');
