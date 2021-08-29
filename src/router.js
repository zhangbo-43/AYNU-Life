//导入vue-route路由对象
import VueRoute from 'vue-router'
import HomeContent from './components/tab/home.vue'
import ClassesContent from './components/tab/classes.vue'
import FindContent from './components/tab/find.vue'
import MineContent from './components/tab/mine.vue'
import CartContent from './components/tab/cart.vue'
import NewslistContent from './components/tab/newslist.vue'
import NewsinfoContent from './components/tab/newsinfo.vue'
// import ComponentContent from './components/tab/subComponents/comment.vue'
import imagelist from './components/tab/photo/imagelist.vue'
import imageinfo from './components/tab/photo/imageinfo.vue'
import goodslist from './components/shop/goodslist.vue'
import goodsinfo from './components/shop/goodsinfo.vue'
import numberbox from './components/tab/subComponents/numberbox.vue'
var router = new VueRoute({
    routes: [{
            path: '/',
            redirect: '/home'
        }, {
            path: '/home',
            component: HomeContent
        },
        {
            path: '/classes',
            component: ClassesContent
        },
        {
            path: '/find',
            component: FindContent
        },
        {
            path: '/mine',
            component: MineContent
        },
        {
            path: '/cart',
            component: CartContent
        },
        {
            path: '/home/newslist',
            component: NewslistContent
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsinfoContent
        },
        {
            path: '/home/imagelist',
            component: imagelist
        },
        {
            path: '/home/imageinfo/:id',
            component: imageinfo
        },
        {
            path: '/home/goodslist',
            component: goodslist
        },
        {
            path: '/home/goodsinfo/:id',
            component: goodsinfo,
            name: 'goodsinfo'
        },
        {
            path: '/home/numberbox',
            component: numberbox
        }
    ]
});

export default router;