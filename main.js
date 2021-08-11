import Vue from 'vue'
import App from './App'

import store from './store'
import './common/env/env.js'
import {
	httpRequest,
	uploadFile
} from './common/api/http.js'

Vue.config.productionTip = false
Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$uploadFile = uploadFile

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
