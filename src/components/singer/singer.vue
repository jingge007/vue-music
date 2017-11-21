<template>
  <div class="singer" ref="singer">
    <listview @select="selectSinger" :data="singers" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>
<script>
  import {ERR_OK} from 'api/config'
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'     // 这是Singer封装的一个对象类
  import listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {          // 当出现迷你播放器的时候，让列表的bottom为60px
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this._normalizeSinger(res.data.list)
          }
        })
      },
      // 整理歌手列表的数据，获取我们需要的数据
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {      // 遍历歌手列表的数据获取我们需要的数据参数,即是热门歌手（前10位的歌手列表）
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({      // 获取歌手的拼音开头的大写字母
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 为了得到歌手字母的有序列表，需要对map进行处理
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {   // sort() 方法用于对数组的元素进行排序, charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // console.log(hot.concat(ret))
        // return hot.concat(ret)
        this.singers = hot.concat(ret)  // concat() 方法用于连接两个或多个数组
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      listview
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .singer {
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
  }
</style>
