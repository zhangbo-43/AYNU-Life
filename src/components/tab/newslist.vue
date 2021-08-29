<template>
  <div class="newslistBox">
    
    <ul class="newslist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100"
      style="max-height:100vh; overflow-y:auto;"
    >
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <p class="news_title">{{item.title}}</p>
          <p class="news_content">
              <span class="author">{{item.author}}</span>
              <span class="add_time">{{item.add_time | dataFormat}}</span>
              <span class="item.click_count">{{item.click_count}}</span>
          </p></router-link>
      </li>
      <li class="spinner">
        <mt-spinner type="fading-circle" v-show='!loading'></mt-spinner>
        <p v-show='loading'>加载完成</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'newslist',
  data() {
    return {
      loading: false, //默认为alse，允许发送请求
      list: [],
      pageindex: 1,
      pagesize: 10,
    };
  },
  created() {
    this.loadMore();
  },
  methods: {
    //请求参数：pageindexx => 代表查询那一页
    //pagesize => 代表每一页查询多少个记录
    loadMore() {
      this.loading=true;//当发送一次请求未完成时，禁止响应新的请求
      this.$http
        .get("http://www.barteam.cn:8086/news/newslist", {
          params: {
            
            Pageindex: this.pageindex,
            Pagesize: this.pagesize,
          },
        }).then((res)=> {
          this.loading=false;
          // console.log(res.data);
          this.pageindex++; //页码自增
           res.data.Data.forEach(item =>{
                return item.add_time = new Date();
           });
          if(res.data.Data.length < this.pagesize){
              this.loading = true;//加载完最后一页，停止发送请求
          }
          this.list = this.list.concat(res.data.Data);
        });
    },
  },
};
</script>
<style lang="less">
.newslistBox{
    .newslist{
        list-style-type: none;
        padding: 0 16px;
        padding-bottom: 40px;
        >li{
            border-bottom:1px solid #ddd;
            margin: 0 ;
        }
        .news_content{
          font-size: 12px;
          color: rgb(150, 142, 142);
          display: flex;
          justify-content: space-between;
        }
        .news_title{
            font-size: 16px;
            font-weight: bold;
           color: #333;
        }
        .spinner{
          position: relative;
          left: 45%;
          border: none;
        }

    }
}
</style>