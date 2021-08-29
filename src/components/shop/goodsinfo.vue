<template>
  <div class="goodsinfoContainer">
    <!-- 轮播图 -->
    <swipe :speed="3000" :swipeList="swipeList"></swipe>
    <!-- 商品信息 -->
    <div class="goodsTnfo">
      <p class="price">
        <span class="sellPrice">
          <span>$</span>
          {{ goodsInfo.sell_price }}
        </span>
        <span class="marketPrice">
          <label class="lb">商场价</label>
          {{goodsInfo.market_price}}
        </span>
      </p>
      <p class="title">{{ goodsInfo.title }}</p>
      <p class="abstract">{{ goodsInfo.abstract }}</p>
      <p class="add_time">
        <label class="lb">发布时间：</label
        >{{ goodsInfo.add_time | dataFormat }}
      </p>
      <p class="stock">
        <span> <label class="lb">库存：</label>{{ goodsInfo.stock }} </span>
        <span>
          <label class="lb">关注度：</label>{{ goodsInfo.click_count }}
        </span>
      </p>
      <p class="count">
        <label class="lb"> 购买数量:</label>

        <!-- 导入numberbox组件-->
        <!-- 挂载到父组件身上 -->
        <!-- 以标签形式插入到合适位置 -->
        <numberbox
          :min="1"
          :max="goodsInfo.stock"
          :initCount="1"
          @getCount="getGoodsCount"
          :goodsId = "this.goodsId"
          :isChangStore='false'
        ></numberbox>
      </p>
      <p>
        <button type="button" class="mui-btn" @click="addToCart">
          加入购物车
        </button>
        <button type="button" class="mui-btn mui-btn-primary">立即购买</button>
      </p>
    </div>
    <!-- 卖家信息 -->
    <div class="sellerInfo">
      <h3>卖家信息</h3>
      <p class="seller">
        <label class="lb">卖家：</label>{{ goodsInfo.seller }}
      </p>
      <p class="seller_phone">
        <label class="lb">电话：</label>{{ goodsInfo.seller_phone }}
      </p>
    </div>
    <!-- 商品详情 -->
    <div class="imgInfo">
      <ul>
        <li v-for="item in swipeList" :key="item.id">
          <img :src="item.img_url" />
        </li>
      </ul>
    </div>
    <!-- 评论 -->
    <section class="cmt">
        <comment :id="this.goodsId"></comment>
    </section>
    <!-- <div class="comment"></div> -->
  </div>
</template>
<script>
import swipe from "../tab/subComponents/swipe";
import { Toast } from "mint-ui";
import numberbox from "../tab/subComponents/numberbox";
import comment from '../tab/subComponents/comment'
export default {
  data() {
    return {
      swipeList: [],
      goodsId: this.$route.params.id,
      goodsInfo: {},
      goodsCount: 1,
    };
  },
  methods: {
    getSwipeData() {
      this.$http({
        method: "get",
        url: "http://www.barteam.cn:8086/thumbs/" + this.goodsId,
      }).then((response) => {
        var data = response.data;
        if (data.Status == 0) {
          this.swipeList = data.Data;
        } else {
          Toast("无法获取商品轮播图");
        }
      });
    },
    getGoodsInfo() {
      this.$http({
        method: "get",
        url: "http://www.barteam.cn:8086/goods/goodinfo",
        params: {
          goodsid: this.goodsId,
        },
      }).then((response) => {
        var data = response.data;
        if (data.Status == 0) {
          this.goodsInfo = data.Data[0];
        } else {
          Toast("无法获取商品数据");
        }
      });
    },
    addToCart() {
      //子组件向父组件传值
      //1父组件通过事件机制给子组件传递一个带参数的方法
      //2在子组件内部找合适的时机，调用该方法，通过参数传值，把相传给父组件的数据传过来
      var goods = {
        id: this.goodsId,
        img_url: this.goodsInfo.img_url,
        title: this.goodsInfo.title,
        price: this.goodsInfo.sell_price,
        count: this.goodsCount,
        stock:this.goodsInfo.stock,
      };
      // this.$store.state.cart.push(goods);
      this.$store.commit("addToCart", goods);
      console.log(this.$store.state.cart);
    },
    //要传递给子组件的方法，用来让子组件想父组件传递参数
    getGoodsCount(count) {
      this.goodsCount = count;
      console.log(count);
    },
  },
  components: {
    swipe,
    numberbox,
    comment,
  },
  created() {
    this.getSwipeData();
    this.getGoodsInfo();
    this.getGoodsCount();
  },
};
</script>
<style lang="less">
.goodsinfoContainer {
  padding-bottom: 20px;
  padding: 8x;
  .goodsTnfo {
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    p {
      font-size: 14px;
      color: #333;
      line-height: 16px;
      margin: 20px;
      label.lb {
        color: #999;
        margin-right: 20px;
      }
    }
    .price {
      .sellPrice {
        color: #ce0000;
        font-size: 28px;
        font-weight: bold;
        span {
          font-size: 13px;
        }
      }
      .marketPrice {
        text-decoration: line-through;
        .lb {
          margin: 0;
        }
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .abstract {
      font-size: 15px;
      line-height: 20px;
    }
    .stock {
      span {
        margin-right: 20px;
      }
    }
  }
  .sellerInfo {
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    h3 {
      font-size: 14px;
      color: #999;
      margin-bottom: 20px;
    }
    p {
      color: #333;
      label.lb {
        color: #999;
        margin-right: 20px;
      }
    }
  }
  .imgInfo{
     background-color: #fff;
     border-radius: 5px;   
     ul{
       list-style: none;
       padding: 0;
       margin: 0;
       li{
         width: 100%;
       }
       img{
         width: 100%;
       }
     }
      }
      
  }

</style>