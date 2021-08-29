<template>
  <div class="goodslistContainer">
    <ul
      class="mui-table-view"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100"
      style="max-height: 100vh; overflow-y: auto"
    >
      <li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media" @click="goToGoodsinfo(item.id)">
         <!-- <router-link :to="'/home/goodsinfo/' + item.id"> --> 
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
                <h3 class="title">{{item.title}}</h3>
                    <p class="price">
                        <span class="sellPrice">{{item.sell_price}}</span>

                        <span class="marketPrice">原价：{{item.market_price}}</span>
                    </p>
                    <p class="stock">库存：{{item.stock}}</p>
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">
					立即抢购
				</button>
                
                </div>
         <!-- </router-link
        > -->
      </li>
       <li class="more_loading">
        <mt-spinner type="fading-circle" v-show='is_loading_more'></mt-spinner>
        <p v-show='finished'>加载完成</p>
      </li>
      
    </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            list:[],
            pagesize:8,
            pageindex:1,
            is_loading_more:false,
            finished:false,
        }
    },
    methods:{
        loadMore:function(){
            this.isLoading = true;
            this.is_loading_more=true;
            this.finished = false;
            this.$http({
                method:'get',
                url:'http://www.barteam.cn:8086/goods/goodsList',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize,
                }
            }).
            then(response=>{
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length>0){
                        this.list = this.list.concat(data.Data);
                        this.pageindex++;
                        this.isLoading = false;
                    }else{
                        this.isLoading = true;
                        this.finished = true;
                        this.is_loading_more = false;
                    }
                }else {
                    Toast('无法获取商品列表数据');
                }
            })
        },
        goToGoodsinfo: function(goodsId){
            //编程式导航
            //1给li标签添加@click事件
            //2在路由模块router.js中，给路由匹配规则添加name属性
            //3在click事件中，使用this.$router.push({name:xxx,params:{}})
            this.$router.push({name:'goodsinfo',params:{id:goodsId}})
        }
    }
};
</script>
<style lang="less">
.goodslistContainer{
    padding-bottom: 50px;
    .mui-table-view-cell{
        .mui-media-object{
            max-width: 120px;
            height: 100px;
        }
        .mui-media-body{
            .title{
                font-size: 16px;
                font-weight: bold;
                font-family: '微软雅黑';
                color: #333;
                padding-bottom: 18px;
            }
            .price{
                font-size: 12px;
                color: #888;
                margin: 0;
                position: relative;
                .sellPrice{
                    font-size: 18px;
                    color: rgb(19, 147, 233);
                    font-family: '微软雅黑';
                    font-weight: bold;
                    margin-right: 10px;
                }
                .marketPrice{
                    text-decoration:line-through;
                }
               
                    
            }
             .mui-btn-outlined.mui-btn-primary{
                    position:absolute;
                    bottom:10px;
                    right: 20px;
                }
        }
    }
    li.more_loading{
                font-size: 12px;
                color: sandybrown;
                text-align: center;
                border: none;
                .mint-spinner-fading-circle{
                    position: relative;
                    left: 45%;
                }
            }
}
</style>