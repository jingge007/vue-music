import {playMode} from 'common/js/config'
// import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},              // 定义歌手列表的vuex状态管理数据的对象
  playing: false,         // 定义播放器按钮状态
  fullScreen: false,     // 定义播放器全屏的展开与收起
  playlist: [],          // 定义歌曲播放的列表
  sequenceList: [],      // 定义顺序播放歌曲的列表
  mode: playMode.sequence,        // 定义播放器为顺序播放模式
  currentIndex: -1      // 定义当前播放歌曲的索引
  // disc: {},          //
  // topList: {},        //
  // searchHistory: loadSearch(),       //
  // playHistory: loadPlay(),       //
  // favoriteList: loadFavorite()       //

}

export default state
