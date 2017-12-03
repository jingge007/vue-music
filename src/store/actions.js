import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache.js'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {      // 定义选择播放
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {         // 当点击列表歌曲是随机播放模式时，将歌曲的列表数据打乱
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {          // 当点击歌曲列表上的随机播放全部时，重新把数据提交到action上
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()       // slice() 方法可从已有的数组中返回选定的元素。
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]     // 记录当前的歌曲
  let fpIndex = findIndex(playlist, song)     // 查找当前列表中是否有待插入的歌曲并返回其索引
  currentIndex++             // 因为是插入歌曲所以索引要+1
  playlist.splice(currentIndex, 0, song)       // 插入这首歌到当前索引位置---splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
  if (fpIndex > -1) {         // 如果已经包含了这首歌
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)    // 如果当前插入的序号大于列表中的序号
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {          // 保存搜索历史的数据
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {          // 删除搜索历史的数据
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {           // 清空搜索历史列表框的数据
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

