<template>
  <div class="search">
    <div class="search-box-wrapper">
      <searchbox ref="searchBox" @query="onQueryChange"></searchbox>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" :data="shortcut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" @click="addQuery(item.k)" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <!--搜索历史-->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
          <i class="icon-clear"></i>
          </span>
            </h1>
            <searchlist :searches="searchHistory" @select="addQuery" @delete="deleteOne"></searchlist>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest @listScroll="blurInput" ref="suggest" :query="query" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll.vue'
  import searchbox from 'base/searchbox/searchbox.vue'
  import {getHotKey} from 'api/search.js'
  import {ERR_OK} from 'api/config'
  import suggest from 'components/suggest/suggest.vue'
  import searchlist from 'base/searchlist/searchlist.vue'
  import confirm from 'base/confirm/confirm.vue'
  import {playlistMixin} from 'common/js/mixin'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        hotKey: [],
        query: ''
      }
    },
    watch: {
      query(newQuery) {          // 当在搜索框中搜索歌曲添加搜索历史的数据时，监听高度的变化，刷新滚动
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    created() {
      this._getHotKey()
    },
    computed: {
      shortcut() {                       // 将搜索关键词的数据和搜索历史的数据合并一个数据，传给scroll组件
        return this.hotKey.concat(this.searchHistory)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      ...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory']),
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      _getHotKey() {        // 获取热门搜索关键词的数据
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 15)         // slice() 方法可从已有的数组中返回选定的元素。
          }
          // console.log(res.data.hotkey)
        })
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query) {
        this.query = query
      },
      blurInput() {         // 在滚动搜索结果列表时，在手机上让input失去焦点隐藏键盘
        this.$refs.searchBox.blur()
      },
      saveSearch() {               // 将搜索历史的数据缓存到本地中
        this.saveSearchHistory(this.query)
      },
      deleteOne(item) {
        this.deleteSearchHistory(item)
      },
      showConfirm() {
        this.$refs.confirm.show()
      }
    },
    components: {
      scroll,
      searchbox,
      suggest,
      searchlist,
      confirm
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history //
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
