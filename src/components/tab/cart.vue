<template>
  <div class="cartContainer">
    <h2>购物车</h2>
    <ul class="mui-table-view">
      <router-link
        v-for="item in cart"
        :key="item.id"
        class="mui-table-view-cell mui-media"
        tag="li"
        :to="'/home/goodsinfo/' + item.id"
      >
        <img class="mui-media-object mui-pull-left" :src="item.img_url" />

        <div class="mui-media-body">
          <p class="goods-info">
            <span class="title">{{item.title}}</span>
            <span class="price">￥{{item.price}}</span>
          </p>
          <p class="goods-control">
            <numberbox
              :initCount="item.count"
              :min="1"
              :max="item.stock"
              :goodsId="item.id"
              :isChangeStore="true"
            ></numberbox>
            <span class="remove" @click.stop="remove(item.id)">x</span>
          </p>
        </div>
      </router-link>
      <li class="mui-table-view-cell mui-media total-price">
        总金额：<span class="price">{{
          this.$store.getters.getTotalPrice
        }}</span>
      </li>
    </ul>
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block">
      结算
    </button>
  </div>
</template>
<script>
import numberbox from "../tab/subComponents/numberbox";
export default {
  data() {
    return {
      cart: [],
    };
  },
  methods: {
    getCart() {
      //this.cart=this.$store.state.cart;
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    remove(goodsId) {
      console.log(goodsId);
    },
  },
  components: {
    numberbox,
  },
  created() {
    this.getCart();
  },
};
</script>
<style lang="less">
.cartContainer {
  h2 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #444;
    padding: 8px;
    background-color: #fff;
  }
  .mui-table-view {
    margin: 0;
    .mui-table-view-cell {
      width: 100%;
      .mui-media-object {
        max-width: 100px;
        height: 80px;
      }
      .mui-media-body {
        font-size: 16px;
        color: #444;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .price {
          color: #222;
          font-weight: bold;
        }
      }
      .goods-control {
        display: flex;
        justify-content: space-between;
        .remove {
          font-size: 30px;
          padding: 10px;
        }
      }
    }
    li.total-price {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      background-color: #fff;
      .price {
        color: rgb(9, 168, 221);
      }
    }
  }
  .mui-btn-primary {
    position: fixed;
    bottom: 50px;
  }
}
</style>