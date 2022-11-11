import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import i18n from './locales/index';

createApp(App).use(i18n).mount('#app');
