import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import Rank from 'components/rank/rank.vue'
import Recommend from 'components/recommend/recommend.vue'
import Search from 'components/search/search.vue'
import Singer from 'components/singer/singer.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'
import disc from 'components/disc/disc.vue'
import toplist from 'components/toplist/toplist.vue'

Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/Recommend', component: Recommend},
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: toplist
        }
      ]
    },
    {
      path: '/Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/Search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
