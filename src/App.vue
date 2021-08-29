<template>
  <div id="app" class="appContent">
    <header id="header" class="mui-bar mui-bar-nav">

      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" v-show="goBackbtn" @click="goback"></a>
      <h1 class="mui-title">爱安师，爱生活</h1>
    </header>
    <div class="mui-content">
      <transition>
        <keep-alive include="newslist">
           <router-view></router-view>
        </keep-alive>
        
      </transition>
     
    </div>
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item mui-active" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/classes" class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-extra mui-icon-extra-class">
          <span class="mui-badge">9</span>
        </span>
        <span class="mui-tab-label">分类</span>
      </router-link>
      <router-link to="/find" class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
        <span class="mui-tab-label">发现</span>
      </router-link>
      <router-link to="/cart" class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{this.$store.getters.getTotalCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/mine" class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return{
      goBack:false
    }
  },
  created(){
     if(this.$route.path == '/home'){
        this.goBackbtn =false;
      }else{
        this.goBackbtn = true;
      }
  },
  
  methods:{
    goback(){
      this.$router.go(-1)
    }
  },
  watch:{
    '$route.path':function(newValue){
      if(newValue == '/home'){
        this.goBackbtn =false;
      }else{
        this.goBackbtn = true;
      }
    }
  }
};
</script>

<style lang='less'>
.appContent {
  .mui-bar-nav {
    background-color:#ce0000;
    h1 {
      color: rgb(186, 221, 188);
      font-weight: bold;
    }
  }
  .mui-bar-tab {
    .router-link-active {
      color: aqua;
    }
  }
  .mui-content {
    overflow: hidden;
  }
  
  .v-enter {
    transform: translate(400px);
  }
  .v-leave-to {
    position: absolute;
    transform: translate(-400px);
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s;
  }
}
</style>
