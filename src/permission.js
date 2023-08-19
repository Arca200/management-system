import { router, addRoutes } from "~/router"
import { getToken } from "~/composables/auth"
import { toast, showFullloading, hiddenFullloading } from '~/composables/ulti'
import store from "./store"

let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
    showFullloading()
    //没有登陆，强制跳转到登陆页
    const token = getToken()

    if (!token && to.path != '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }

    if (token && to.path == '/login') {
        toast('已登陆', 'error')
        return next({ path: from.path })
    }
    //设置网页的标题
    document.title = to.meta.title ? to.meta.title : '未命名页'

    //如果用户登陆了,自动获取信息并存储在vuex中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let {menus} = await store.dispatch('getInfo')
        console.log(menus)
        //动态添加路由
        hasNewRoutes = addRoutes(menus)
        hasGetInfo = true
    }
    hasNewRoutes?next(to.fullPath) : next()
})

router.afterEach((to, from) => {
    hiddenFullloading()
})