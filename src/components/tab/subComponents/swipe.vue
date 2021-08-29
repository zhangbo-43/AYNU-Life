<template>
    <div class="swipeContainer">
        <mt-swipe :auto='speed'>
         <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt="" />
      </mt-swipe-item></mt-swipe>
    </div>
</template>
<script>
export default {
    
  props:['swipeList','speed']

}
</script>
<style lang="less">
    .swipeContainer{
     
         .mint-swipe {
    width: 100%;
    height: 280px;
    img {
      position: absolute;
      width: 100%;
      bottom: 10px;
      top: -40px;
      
    }}
    }
</style>