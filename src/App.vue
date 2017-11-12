<template>
  <div id="app">
    <v-Mheader></v-Mheader>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import Mheader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab.vue'
  import player from 'components/player/player.vue'

  export default {
    components: {
      'v-Mheader': Mheader,
      'v-tab': Tab,
      player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
