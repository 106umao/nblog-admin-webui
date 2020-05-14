import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import ISvgIcon from '@/components/ISvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('isvg-icon', ISvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
