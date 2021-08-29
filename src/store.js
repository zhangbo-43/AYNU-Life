//import { forEach } from 'core-js/fn/array';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var lsCart = JSON.parse(localStorage.getItem('cart') ||'[]');
const store = new Vuex.Store({
    state:{
        cart: lsCart,
    },
    mutations:{
        addToCart(state,goods){
            var flag = false;
            state.cart.some(item =>{
                if(goods.id ==item.id){
                    item.count += parseInt(goods.count);
                    flag =true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goods);
            }
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        removeGoods(state,goodsId){
            state.cart = state.cart.filters(item =>{
                return item.id != goodsId;
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        updateStore(state,goodsInfo){
            state.cart.some(item =>{
                if(item.id == goodsInfo.id){
                    item.count = goodsInfo.count;
                }
            })
            if(state.cart.length >0){
                localStorage.setItem('cart',JSON.stringify(state.cart));
            }
        }
    

    }, 
    getters:{
        getTotalCount(state){
            var total = 0;
            state.cart.forEach(item =>{
                total +=item.count;
            })
            return total;
        },
        getTotalPrice(state){
            var total = 0;
            state.cart.forEach(item=>{
                total += item.price * item.count;
            })
            return total;
        }

    }
})
export default store;