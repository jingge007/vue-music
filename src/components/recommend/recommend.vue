<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discLists" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href='item.linkUrl'>
                <img @load="loadImge" :src="item.picUrl" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discLists">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discLists.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import loading from 'base/loading/loading'
  import scroll from 'base/scroll/scroll'
  import {ERR_OK} from 'api/config'
  import {getRecommend, getDiscList} from 'api/recommend'
  import slider from 'base/slider/slider'

  export default {
    data() {
      return {
        recommends: [],
        discLists: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
            // let bbb = res.data.slider
            // console.log(bbb)
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discLists = res.data.list
           // let bbb = res.data.list
           // console.log(bbb)
          }
        })
      },
      loadImge() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    components: {
      slider,
      scroll,
      loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "~common/stylus/variable"

  .recommend {
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
  }

  .recommend-content {
    height: 100%
    overflow: hidden
  }

  .slider-wrapper {
    position: relative
    width: 100%
    overflow: hidden
  }

  .recommend-list .list-title {
    height: 65px
    line-height: 65px
    text-align: center
    font-size: $font-size-medium
    color: $color-theme
  }

  .item {
    display: flex
    box-sizing: border-box
    align-items: center
    padding: 0 20px 20px 20px
  }

  .item .icon {
    flex: 0 0 60px
    width: 60px
    padding-right: 20px
  }

  .item .text {
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1
    line-height: 20px
    overflow: hidden
    font-size: $font-size-medium
  }

  .text .name {
    margin-bottom: 10px
    color: $color-text
  }

  .text .desc {
    color: $color-text-d
  }

  .loading-container {
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  }

</style>
