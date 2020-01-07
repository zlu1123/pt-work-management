import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/home')
      }
    ]
  },
  {
    path: '/position_management',
    name: 'position_management',
    meta: {
      icon: 'logo-buffer',
      title: '职位管理',
      access: ['01']
    },
    component: Main,
    children: [
      {
        path: '/job_posting',
        name: 'job_posting',
        meta: {
          icon: 'ios-exit',
          title: '职位发布维护'
        },
        component: () => import('@/views/position-management/job-posting.vue')
      },
      {
        path: '/job_application',
        name: 'job_application',
        meta: {
          icon: 'md-cafe',
          title: '职位申请维护'
        },
        component: () =>
          import('@/views/position-management/job-application.vue')
      },
      {
        path: '/job_add',
        name: 'job_add',
        meta: {
          hideInMenu: true,
          title: '职位新增'
        },
        component: () => import('@/views/position-management/job-add.vue')
      }
    ]
  },
  {
    path: '/business_management',
    name: 'business_management',
    meta: {
      icon: 'md-briefcase',
      title: '企业管理',
      access: ['00', '01']
    },
    component: Main,
    children: [
      {
        path: 'enterprise_information_maintenance',
        name: 'enterprise_information_maintenance',
        meta: {
          icon: 'md-boat',
          title: '企业信息维护'
        },
        component: () =>
          import(
            '@/views/business_management/enterprise_information_maintenance.vue'
          )
      },
      {
        path: 'corporate_leader_maintenance',
        name: 'corporate_leader_maintenance',
        meta: {
          icon: 'ios-person',
          title: '企业负责人维护'
        },
        component: () =>
          import('@/views/business_management/business-person-maintenance.vue')
      },
      {
        path: 'enterprise_recharge_maintenance',
        name: 'enterprise_recharge_maintenance',
        meta: {
          icon: 'logo-usd',
          title: '企业充值维护'
        },
        component: () =>
          import(
            '@/views/business_management/enterprise_recharge_maintenance.vue'
          )
      },
      {
        path: '/enterprise_add',
        name: 'enterprise_add',
        meta: {
          hideInMenu: true,
          title: '企业新增'
        },
        component: () =>
          import('@/views/business_management/enterprise_add.vue')
      },
      {
        path: '/business_person_add',
        name: 'business_person_add',
        meta: {
          hideInMenu: true,
          title: '企业新增'
        },
        component: () =>
          import('@/views/business_management/business_person_add.vue')
      }
    ]
  },
  {
    path: '/financial_management',
    name: 'financial_management',
    meta: {
      icon: 'md-card',
      title: '财务管理'
    },
    component: Main,
    children: [
      {
        path: 'salary_review',
        name: 'salary_review',
        meta: {
          icon: 'md-medal',
          title: '工资审核'
        },
        component: () =>
          import('@/views/financial_management/salary_review.vue')
      },
      {
        path: 'platform_recharge',
        name: 'platform_recharge',
        meta: {
          icon: 'md-flower',
          title: '平台充值'
        },
        component: () =>
          import('@/views/financial_management/platform_recharge.vue')
      },
      {
        path: 'financial_statements',
        name: 'financial_statements',
        meta: {
          icon: 'md-filing',
          title: '财务报表'
        },
        component: () =>
          import('@/views/financial_management/financial_statements.vue')
      }
    ]
  },
  {
    path: '/advertising_management',
    name: 'advertising_management',
    meta: {
      icon: 'logo-buffer',
      title: '广告管理'
    },
    component: Main,
    children: [
      {
        path: 'advertising_maintenance',
        name: 'advertising_maintenance',
        meta: {
          icon: 'ios-create',
          title: '广告维护'
        },
        component: () =>
          import('@/views/advertising_management/advertising_maintenance.vue')
      },
      {
        path: '/advertising_maintenance_add',
        name: 'advertising_maintenance_add',
        meta: {
          hideInMenu: true,
          title: '广告新增'
        },
        component: () =>
          import(
            '@/views/advertising_management/advertising_maintenance_add.vue'
          )
      }
    ]
  },
  {
    path: '/worker_management',
    name: 'worker_management',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'worker_management_page',
        name: 'worker_management_page',
        meta: {
          icon: 'md-contacts',
          title: '务工人员管理'
        },
        component: () =>
          import('@/views/worker_management/worker_management_page.vue')
      }
    ]
  },
  {
    path: '/platform_management',
    name: 'platform_management',
    meta: {
      icon: 'md-construct',
      title: '平台管理',
      access: ['00']
    },
    component: Main,
    children: [
      {
        path: 'platform_user_maintenance',
        name: 'platform_user_maintenance',
        meta: {
          icon: 'ios-contacts',
          title: '平台用户维护'
        },
        component: () =>
          import('@/views/platform_management/platform_user_maintenance.vue')
      },
      {
        path: 'data_dictionary_maintenance',
        name: 'data_dictionary_maintenance',
        meta: {
          icon: 'ios-construct-outline',
          title: '数据字典维护'
        },
        component: () =>
          import('@/views/platform_management/data_dictionary_maintenance.vue')
      },
      {
        path: 'address_management',
        name: 'address_management',
        meta: {
          icon: 'md-navigate',
          title: '地址管理'
        },
        component: () =>
          import('@/views/platform_management/address_management.vue')
      }
    ]
  },
  {
    path: '/distribution_management',
    name: 'distribution_management',
    meta: {
      icon: 'ios-beer',
      title: '分销管理'
    },
    component: Main,
    children: [
      {
        path: 'distribution_staff_management',
        name: 'distribution_staff_management',
        meta: {
          icon: 'md-bicycle',
          title: '分销人员管理'
        },
        component: () =>
          import(
            '@/views/distribution_management/distribution_staff_management.vue'
          )
      },
      {
        path: 'distribution_finance',
        name: 'distribution_finance',
        meta: {
          icon: 'logo-bitcoin',
          title: '分销财务'
        },
        component: () =>
          import('@/views/distribution_management/distribution_finance.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: '/job-add',
      name: 'job-add',
      component: () => import('@/views/position-management/job-add.vue')
    },
    {
      path: '/enterprise-add',
      name: 'enterprise-add',
      component: () => import('@/views/business_management/enterprise_add.vue')
    },
    {
      path: '/business_person_add',
      name: 'business_person_add',
      component: () =>
        import('@/views/business_management/business_person_add.vue')
    },
    {
      path: '/advertising_maintenance_add',
      name: 'advertising_maintenance_add',
      component: () =>
        import('@/views/advertising_management/advertising_maintenance_add.vue')
    }
  ]
}
