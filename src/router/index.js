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
    path: '/label',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Label',
        component: () => import('@/views/label/index'),
        meta: { title: '标签管理', icon: 'dashboard' }
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
    meta: {
      title: '设计中心',
      icon: 'example'
    },
    children: [
    // 设计师中心
      {
        path: '/designer',
        name: 'Designer',
        component: () => import('@/views/designer/designer/designer'),
        meta: { title: '设计师中心',}
      },
      {
        path: '/designer/designerAdd',
        component: () => import('@/views/designer/designer/designerAdd'),
        meta: { title: '设计师新增' },
        hidden:true
      },
      {
        path: '/designer/designerEdit',
        component: () => import('@/views/designer/designer/designerEdit'),
        meta: { title: '设计师编辑' },
        hidden:true
      },
      // 装饰中心
       {
        path: '/decorate',
        name: 'Decorate',
        component: () => import('@/views/designer/decorate/decorate'),
        meta: { title: '装饰中心',}
      },
        {
        path: '/decorate/decorateAdd',
        component: () => import('@/views/designer/decorate/decorateAdd'),
        meta: { title: '装饰设计新增' },
        hidden:true
      },
      {
        path: '/decorate/decorateEdit',
        component: () => import('@/views/designer/decorate/decorateEdit'),
        meta: { title: '装饰设计编辑' },
        hidden:true
      },
      // 产品中心
       {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/designer/product/product'),
        meta: { title: '产品中心', }
      },
        {
        path: '/product/productAdd',
        component: () => import('@/views/designer/product/productAdd'),
        meta: { title: '产品中心新增' },
        hidden:true
      },
      {
        path: '/product/productEdit',
        component: () => import('@/views/designer/product/productEdit'),
        meta: { title: '产品中心编辑' },
        hidden:true
      },  
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
        path: 'industryNews/newsAdd',
        component: () => import('@/views/news/industryNews/newsAdd'),
        meta: { title: '行业新闻新增' },
        hidden:true
      },
      {
        path: 'industryNews/newsEdit',
        component: () => import('@/views/news/industryNews/newsEdit'),
        meta: { title: '行业新闻编辑' },
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
