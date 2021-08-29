<template>
  <div class="imageinfoContainer">
    <!-- 顶部基本信息 -->
    <section class="top">
      <h3 class="title">{{ imgInfo.title }}</h3>
      <p class="subinfo">
        <span class="author">发布者：{{ imgInfo.author }}</span>
        <span class="add_time">{{ imgInfo.add_time | dataFormat }}</span>
        <span class="click_count">阅读量：{{ imgInfo.click_count }}</span>
      </p>
    </section>
    <!-- 简介 -->
    <section class="abstract">
      <p v-html="imgInfo.abstract"></p>
    </section>

    <!-- 缩略图 -->
    <section class="thumbs">
      <!-- Vur-preview使用步骤 -->
      <!-- 1安装npm i Vue-preview -S -->
      <!-- 2 在main.js中导入-->
      <!-- 3挂载到Vue上Vue.use(VuePreview);
            4在组件的template模板中，使用它，标签名是vue-preview 
            其中 :slides属性是用于邦定具体的预览图片数据，这个属性必须有
            5在业务逻辑中通过ajax请求，获取:slides需要的数据-->
      <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
    </section>
    <!-- 评论区 -->
    <section class="cmt">
        <comment :id="this.imgId"></comment>
    </section>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from '../subComponents/comment.vue';
export default {
  data() {
    return {
      imgId: this.$route.params.id,
      imgInfo: {},
      thumbsList: [],
    };
  },
  created() {
    this.getImageInfo();
    this.getThumbsList();
  },
  methods: {
    //获取图片基本信息
    getImageInfo: function () {
      this.$http({
        method: "get",
        url: "http://www.barteam.cn:8086/images/imagesinfo",
        params: {
          imgid: this.imgId,
        },
      }).then((response) => {
        var data = response.data;
        if (data.Status == 0) {
          this.imgInfo = data.Data[0];
        } else {
          Toast("获取图片信息失败");
        }
      });
    },
    //获取图片缩略图
    getThumbsList: function () {
      this.$http({
        method: "get",
        url: "http://www.barteam.cn:8086/thumbs/" + this.imgId,
      }).then((response) => {
        var data = response.data;
        if (data.Status == 0) {
          data.Data.forEach((item) => {
            item.w = 600;
            item.h = 400;
            item.src = item.img_url;
            item.msrc = item.img_url;
          });
          this.thumbsList = data.Data;
        } else {
          Toast("获取图片缩略图失败");
        }
      });
    },
  },
  components:{
      comment
  }
};
</script>
<style lang="less">
.imageinfoContainer {
  padding: 10px;
  top {
    border-bottom: 1px solid #bbb;
    .title {
      font-size: 20px;
      color: #333;
      font-family: "微软雅黑";
      text-align: center;
    }
    .subinfo {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  }
  .abstract {
    font-size: 14px;
    padding: 10px;
    color: #444;
    text-indent: 2em;
    line-height: 22px;
  }
  .thumbs{
      //height: 200px;
            // .imgPrev{
            //   .my-gallery{
            //     figure{
            //       display: inline-block;
            //       margin: 9px;
                  img{
                width: 100%;
                // height: 60px;
            
            }
            //     }
            //   }
            // }
            
                
            
        }
}
</style>