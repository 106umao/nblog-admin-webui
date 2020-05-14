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

// # 这里配置角色常量  (不生效。。。直接配置到router文件里吧。。)
export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN'
export const ROLE_SYSTEM_ADMIN = 'ROLE_SYSTEM_ADMIN'
export const ROLE_RESOURCE_ADMIN = 'ROLE_RESOURCE_ADMIN'
export const ROLE_USER_ADMIN = 'ROLE_USER_ADMIN'
export const ROLE_ROLE_ADMIN = 'ROLE_ROLE_ADMIN'
export const ROLE_ARTICLE_ADMIN = 'ROLE_ARTICLE_ADMIN'
export const ROLE_TAG_ADMIN = 'ROLE_TAG_ADMIN'
export const ROLE_COMMENT_ADMIN = 'ROLE_COMMENT_ADMIN'
export const ROLE_REPLY_ADMIN = 'ROLE_REPLY_ADMIN'
export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_USER = 'ROLE_USER'
export const ROLE_CATEGORY_ADMIN = 'ROLE_CATEGORY_ADMIN'

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
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'system',
      roles: [ROLE_SUPER_ADMIN, ROLE_SYSTEM_ADMIN, ROLE_USER_ADMIN, ROLE_ROLE_ADMIN]
    },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/system/user/index'),
        meta: {
          title: '用户管理',
          icon: 'UserSettings',
          roles: [ROLE_SUPER_ADMIN, ROLE_USER_ADMIN]
        }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/system/role/index'),
        meta: {
          title: '角色管理',
          icon: 'role',
          roles: [ROLE_SUPER_ADMIN, ROLE_SYSTEM_ADMIN, ROLE_ROLE_ADMIN]
        }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    name: '资源管理',
    redirect: '/resource/article',
    meta: {
      title: '资源管理',
      icon: 'article',
      roles: [
        ROLE_SUPER_ADMIN,
        ROLE_RESOURCE_ADMIN,
        ROLE_ARTICLE_ADMIN,
        ROLE_CATEGORY_ADMIN,
        ROLE_TAG_ADMIN,
        ROLE_COMMENT_ADMIN,
        ROLE_REPLY_ADMIN
      ]
    },
    children: [
      {
        path: 'article',
        name: '文章管理',
        component: () => import('@/views/resource/article/index'),
        meta: {
          title: '文章管理',
          icon: 'article1',
          roles: [
            ROLE_SUPER_ADMIN,
            ROLE_RESOURCE_ADMIN,
            ROLE_ARTICLE_ADMIN
          ]
        }
      },
      {
        path: 'category',
        name: '分类管理',
        component: () => import('@/views/resource/category/index'),
        meta: {
          title: '分类管理',
          icon: 'category',
          roles: [
            ROLE_SUPER_ADMIN,
            ROLE_RESOURCE_ADMIN,
            ROLE_CATEGORY_ADMIN
          ]
        }
      },
      {
        path: 'tag',
        name: '标签管理',
        component: () => import('@/views/resource/tag/index'),
        meta: {
          title: '标签管理',
          icon: 'cc-tag',
          roles: [
            ROLE_SUPER_ADMIN,
            ROLE_RESOURCE_ADMIN,
            ROLE_TAG_ADMIN
          ]
        }
      },
      {
        path: 'comment',
        name: '评论管理',
        component: () => import('@/views/resource/comment/index'),
        meta: {
          title: '评论管理',
          icon: 'comment1',
          roles: [
            ROLE_SUPER_ADMIN,
            ROLE_RESOURCE_ADMIN,
            ROLE_COMMENT_ADMIN
          ]
        }
      }, {
        path: 'reply',
        name: '回复管理',
        component: () => import('@/views/resource/reply/index'),
        meta: {
          title: '回复管理',
          icon: 'reply',
          roles: [
            ROLE_SUPER_ADMIN,
            ROLE_RESOURCE_ADMIN,
            ROLE_REPLY_ADMIN
          ]
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404', roles: ROLE_USER }}
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

