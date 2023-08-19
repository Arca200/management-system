import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { router } from './router'
import store from './store'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './permission'
import 'nprogress/nprogress.css'

const app = createApp(App)

import permission from './directives/permission'
app.use(permission)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}