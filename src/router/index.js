import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Banner',
        component: () => import('@/views/banner/index'),
        meta: { title: 'Banner管理', icon: 'link' }
      }
    ]
  },
  {
    path: '/kind',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Kind',
        component: () => import('@/views/kind/index'),
        meta: { title: '分类管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/designer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Designer',
        component: () => import('@/views/designer/index'),
        meta: { title: '设计师管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/joinOurs',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'joinOurs',
        component: () => import('@/views/joinOurs/index'),
        meta: { title: '加盟中心', icon: 'table' }
      }
    ]
  },
   {
    path: '/good',
    component: Layout,
    name: 'Good',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/good/add/index'),
        meta: { title: '商品新增' },
        hidden:true
      },
      {
        path: 'list',
        component: () => import('@/views/good/list/index'),
        meta: { title: '商品列表' }
      },
      {
        path: 'edit',
        component: () => import('@/views/good/edit/index'),
        meta: { title: '商品编辑' },
        hidden:true
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    name: 'News',
    meta: {
      title: '新闻中心',
      icon: 'example'
    },
    children: [
      {
        path: 'companyNews',
        component: () => import('@/views/news/companyNews/index'),
        meta: { title: '公司新闻管理'}
      },
      {
        path: 'companyNews/newsEdit',
        component: () => import('@/views/news/companyNews/newsEdit'),
        meta: { title: '公司新闻编辑' },
        hidden:true
      },
      {
        path: 'companyNews/newsAdd',
        component: () => import('@/views/news/companyNews/newsAdd'),
        meta: { title: '公司新闻新增' },
        hidden:true
      },
      {
        path: 'industryNews',
        component: () => import('@/views/news/industryNews/index'),
        meta: { title: '行业新闻管理' }
      },
      {
        path: 'industryNews/newsEdit',
        component: () => import('@/views/news/industryNews/newsEdit'),
        meta: { title: '公司新闻新增' },
        hidden:true
      }
      
      
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
