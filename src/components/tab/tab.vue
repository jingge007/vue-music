<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/Recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "~common/stylus/variable"
  .tab {
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
  }

  .tab .tab-item {
    flex: 1
    text-align: center
  }

  .tab-item .tab-link {
    padding-bottom: 5px
    color: $color-text-l
  }

  .tab .active .tab-link {
    color: $color-theme
    border-bottom: 2px solid $color-theme
  }

</style>
