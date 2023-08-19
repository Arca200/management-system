import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'
import notfound from '../views/notfound.vue'
import login from '../views/login.vue'
import admin from '../layouts/admin.vue'
import list from '~/views/goods/list.vue'
import categorylist from '~/views/category/list.vue'
import UserList from '~/views/user/list.vue'
import OrderList from '~/views/order/list.vue'
import CommentList from '~/views/comment/list.vue'
import ImageList from '~/views/image/list.vue'
import NoticeList from '~/views/notice/list.vue'
import SettingBase from '~/views/setting/list.vue'
import CouponList from '~/views/coupon/list.vue'
import ManagerList from '~/views/manager/list.vue'
import AccessList from '~/views/access/list.vue'
// const routes = [
//   {
//     path: '/',
//     component: admin,
//     children: [
//       {
//         path: '/',
//         component: index,
//         meta: {
//           title: '后台首页'
//         }
//       },
//       {
//         path: '/goods/list',
//         component: list,
//         meta: {
//           title: '商品管理'
//         }
//       },
//       {
//         path: '/category/list',
//         component: categorylist,
//         meta: {
//           title: '分类列表'
//         }
//       },
//     ]
//   },
//   {
//     path: '/login',
//     component: login,
//     meta: {
//       title: '登陆页'
//     }
//   },
//   {
//     //通过正则表达式匹配所有页面
//     path: '/:pathMatch(.*)*',
//     component: notfound,
//     meta: {
//       title: '错误页面'
//     }
//   }
// ]
// 这是默认路由,所有用户共享

const routes = [
  {
    path: '/',
    name: 'admin',
    component: admin
  },
  {
    path: '/login',
    component: login,
    meta: {
      title: '登陆页'
    }
  },
  {
    //通过正则表达式匹配所有页面
    path: '/:pathMatch(.*)*',
    component: notfound,
    meta: {
      title: '错误页面'
    }
  }
]

// 这是动态路由,用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: index,
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: list,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: categorylist,
    meta: {
      title: '分类列表'
    }
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
      title: "用户列表"
    }
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
      title: "订单列表"
    }
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
      title: "评价列表"
    }
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
      title: "图库列表"
    }
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
      title: "公告列表"
    }
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingBase,
    meta: {
      title: "配置"
    }
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
      title: "优惠券列表"
    }
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: ManagerList,
    meta: {
      title: "管理员列表"
    }
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: AccessList,
    meta: {
      title: "菜单权限管理"
    }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//动态添加路由并返回true/false表示添加是否成功
export function addRoutes(menus) {
  // 是否有新路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path == e.frontpath)
      //router.hasRoute检查一个给定名称的路由是否存在
      if (item && !router.hasRoute(item.path)) {
        //addRoute(route): () => void 添加一个新的路由记录到该路由器中 |addRoute(parentName, route): () => void 添加一个新的路由记录，将其作为一个已有路由的子路由
        router.addRoute('admin', item)
        hasNewRoutes = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRoutesByMenus(e.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRoutes
}