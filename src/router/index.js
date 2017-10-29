import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import Rank from 'components/rank/rank.vue'
import Recommend from 'components/recommend/recommend.vue'
import Search from 'components/search/search.vue'
import Singer from 'components/singer/singer.vue'

Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/Recommend', component: Recommend},
    {path: '/Rank', component: Rank},
    {path: '/Recommend', component: Recommend},
    {path: '/Search', component: Search},
    {path: '/Singer', component: Singer}
  ]
})
