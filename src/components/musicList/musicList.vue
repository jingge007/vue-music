<template>
  <div class="musicList">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bgImage" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bgLayer" ref="bgLayer"></div>
    <scroll class="list"
            ref="list"
            @scroll="scroll"
            :listenScroll="listenScroll"
            :probeType="probeType"
            :data="songs"
    >
      <div class="song-list-wrapper">
        <songlist :songs="songs" :rank="rank" @select="selectItem"></songlist>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  import songlist from 'base/songlist/songlist'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        scrollY: 0
      }
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      handlePlaylist(playlist) {         // 当出现迷你播放器的时候，让列表的bottom为60px
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      selectItem(item, index) {
        this.selectPlay({           // 将数据提交到vuex的action中
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({          // 当点击歌曲列表上的随机播放全部时，重新把数据提交到action上
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal)
        let scale = 1
        let zIndex = 0
        let blur = 0
        const percent = Math.abs(newVal / this.imageHeight)
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20, percent * 20)
        }
        this.$refs.bgLayer.style[transform] = `translate3d(0,${translateY}px,0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newVal < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    components: {
      songlist,
      loading,
      scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .musicList {
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
  }

  .musicList .back {
    position absolute
    top: 0
    left: 6px
    z-index: 50
  }

  .back .icon-back {
    display: block
    padding: 10px
    font-size: $font-size-large-x
    color: $color-theme
  }

  .musicList .title {
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text
  }

  .musicList .bgImage {
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover
  }

  .bgImage .play-wrapper {
    position: absolute
    bottom: 20px
    z-index: 50
    width: 100%
  }

  .play-wrapper .play {
    box-sizing: border-box
    width: 135px
    padding: 7px 0
    margin: 0 auto
    text-align: center
    border: 1px solid $color-theme
    color: $color-theme
    border-radius: 100px
    font-size: 0
  }

  .play .icon-play {
    display: inline-block
    vertical-align: middle
    margin-right: 6px
    font-size: $font-size-medium-x
  }

  .play .text {
    display: inline-block
    vertical-align: middle
    font-size: $font-size-small
  }

  .filter {
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, 0.4)
  }

  .bgLayer {
    position: relative
    height: 100%
    background: $color-background
  }

  .list {
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
  }

  .song-list-wrapper {
    padding: 20px 30px
  }

  .loading-container {
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  }


</style>
