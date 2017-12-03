// 本地缓存搜索历史的封装数据
import storage from 'good-storage'

const SEARCH_KEY = '__search__'        // 定义缓存搜索历史的变量名
const SEARCH_MAX_LEN = 15              // 定义最多缓存的数据量

const PLAY_KEY = '__play__'            // 定义播放歌曲的变量名
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {       // 将最新的数据插入数组的封装方法
  const index = arr.findIndex(compare)          // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)              // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
  if (maxLen && arr.length > maxLen) {
    arr.pop()                // 将最新的数据插入到数组的最前面，然后删除数组最后一条的数据
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {            // 保存搜索历史的数据
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {           // 删除搜索历史的数据
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {      // 清空搜索历史列表框的数据
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {                // 将搜索历史的数据缓存到本地中，提交vuex中
  return storage.get(SEARCH_KEY, [])
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

