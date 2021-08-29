<template>
    <div class="imagelistContainer">
        <ul class="imagelist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isloading"
      infinite-scroll-distance="100"
      style="max-height:100vh; overflow-y:auto;"
    >
      <li v-for="item in list" :key="item.id">
         
         <router-link :to="'/home/imageinfo/' + item.id">
        <img v-lazy='item.img_url'>
        <div class="info">
             
            <h4 class="info_title">{{item.title}}</h4>
            <p class="info_abstract">{{item.abstract}}</p>
            
        </div></router-link>
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
    //js代码
    name:'imagelist',
    data(){

        return{
            isLoading:false,
            is_loading_more:false,
            finished:false,
            pageindex:1,
            pagesize:5,
            list:[],
        }
    },
    methods: {
        loadMore(){
            this.isLoading=true;
            this.$http({
                methods:'get',
                url:'http://www.barteam.cn:8086/images/imagelist',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize,
                }
            })
            .then(response=>{
                var data = response.data;
                if(data.Status == 0){
                    if(data.Data.length > 0){
                        this.list = this.list.concat(data.Data);
                        this.pageindex++;
                        this.isLoading=false;
                    }else{
                        //数据到底了
                        this.isLoading = true;
                        this.finished = true;
                    }
                }else{
                        Toast('请求数据失败');
                }
            })
        }
    },
}
</script>
<style lang="less">
    .imagelistContainer{
        padding-bottom: 50px;
        
        .imagelist{
            margin: 0;
            padding: 10px;
            list-style: none;
            li{
                margin-bottom: 8px;
                position: relative;
                img{
                    width: 100%;
                    height: 260px;
                    box-shadow: 0 2px 4px #333;

                }
                image[lazy=loading]{
                    width:40px;
                    height: 260px;
                    margin: auto;
                }
                div.info{
                    position: absolute;
                    bottom: 0;
                    padding: 5px;
                    color: #eee;
                    background-color: rgba(0,0,0,0.4);
                    .info_title{
                        font-size: 14px;

                    }
                    .info_abstract{
                        color: #eee;
                        font-size: 12px;
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
            

        
    }
</style>