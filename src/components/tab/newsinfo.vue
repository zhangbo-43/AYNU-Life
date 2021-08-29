<template>
  <div class="newsinfoContainer">
    <!-- 标题部分 -->
    <section class="title">
        <h2>{{this.news.title}}</h2>
    </section>
    <!-- 编辑日期。点击量。部分 -->
    <section class="des">
        <p>
            <span class="author">编辑:{{this.news.author}}</span>
            <span class="add_time">日期：{{this.news.add_time | dataFormat}}</span>
            <span class="click_count">阅读：{{this.news.click_count}}</span>
        </p>
    </section>
    <!-- 图片 -->
    <section class="img">
        <img :src="this.news.img_url" alt="">
    </section>
    <!-- 新闻正文 -->
    <section class="content">
        <div v-html='this.news.content'>

        </div>
    </section>
    <!-- 评论部分 -->
    <section class="comment">
        <!-- 封装一个评论组件 -->
        <comment :id="this.newsid"></comment>
    </section>
  </div>
</template>
<script>
import comment from './subComponents/comment.vue'
//1.导入评论组件
//2.把comment组件挂载到newsinfo组件上
//3.通过标签的形式，插入到newsinfo的template中
export default {
    data(){
        return {
            newsid:this.$route.params.id,
            news:{}
        }
    },
    created(){
        this.loadNewsInfo();
    },
    methods:{
        loadNewsInfo:function(){
            this.$http({
                methods:'get',
                url:'http://www.barteam.cn:8086/news/newsinfo',
                params:{
                    newsid:this.newsid
                }
            })
            .then(response=>{
                var data = response.data;
                if(data.Status==0){
                    this.news=data.Data[0];
                }
            })
        }
    },
    components:{
      comment,
    }
}
</script>
<style lang="less">
    .newsinfoContainer{
        padding: 15px;
        .title{
            padding: 5px 0;
            font-size: 24px;
            color: #333;

        }
        .des{
            font-size: 12px;
            color: #aaa;
            padding-bottom: 20px;
            p{
                display: flex;
                justify-content: space-between;
            }
        }
        .img{
            img{
                width: 100%;
            }
            padding-bottom: 10px;
        }
        .content{
            font-size: 14px;
            columns: #444;
            p{
                text-indent: 20px;
            }
            img{
                width: 100%;
            }
        }
    }
</style>