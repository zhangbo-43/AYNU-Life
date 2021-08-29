<template>
  <div class="mui-numbox">
    <button
      class="mui-btn mui-btn-numbox-minus"
      type="button"
      @click.stop="subtract"
      :disabled="subDis"
    >
      -
    </button>
    <input class="mui-input-numbox" type="number" :value="currentCount" />
    <button
      class="mui-btn mui-btn-numbox-plus"
      type="button"
      @click.stop="plus"
      :disabled="plusDis"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  props: [
    "initCount",
    "min",
    "max",
    "goodsId",
    "isChangeStore", //用来判断是否修改商品个数时影响仓储【true/false】
  ],
  data() {
    return {
      currentCount: 1,
      plusDis: false,
      subDis: true,
    };
  },
  methods: {
    setDisable: function () {
      if (this.currentCount >= this.max) {
        this.plusDis = true;
        this.subDis = false;
      } else {
        if (this.currentCount <= this.min) {
          this.plusDis = false;
          this.subDis = true;
        } else {
          this.plusDis = false;
          this.subDis = false;
        }
      }
    },
    plus: function () {
      if (this.currentCount < this.max) {
        this.currentCount++;
      }
      //设置2个button的disable
      this.setDisable();
    },
    subtract: function () {
      if (this.currentCount > this.min) {
        this.currentCount--;
      }
      //设置2个button的disable
      this.setDisable();
    },
  },
  created() {
    this.currentCount = this.initCount;
  }, //使用watch监听currentCount
  watch: {
    currentCount: function (newValue) {
      this.$emit("getCount", newValue);
      if (this.isChangeStore) {
        var goodsInfo = { id: this.goodsId, count: this.currentCount };
        this.$store.commit("updateStore", goodsInfo);
      }
    },
  },
};
</script>
<style lang="less">
</style>