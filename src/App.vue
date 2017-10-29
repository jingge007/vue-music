<template>
  <div id="app">
    <v-Mheader></v-Mheader>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Mheader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab.vue'

  export default {
    components: {
      'v-Mheader': Mheader,
      'v-tab': Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
</style>
