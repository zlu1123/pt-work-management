// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import viewDesign from 'view-design'
import VueAMap from 'vue-amap'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import md5 from 'js-md5'
import { localData, sessionData } from './libs/local'

Vue.prototype.$localData = localData
Vue.prototype.$sessionData = sessionData
Vue.prototype.$md5 = md5
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

// import style
import 'view-design/dist/styles/iview.css'

Vue.use(viewDesign, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德key
  // key: '1e098fb2b135edf3f50eb0b5cafef19c',
  key: 'd618bbef4475929b27c029cf6cb01bf1',
  // 插件集合 （插件按需引入）
  // plugin: ['AMap.Geolocation']
  plugin: [
    'AMap.Geocoder',
    'AMap.Geolocation',
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  v: '1.4.4'
})

Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
