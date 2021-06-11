export function CourseManageRoute (path = 'course-manage', name = path) {
  return {
    path,
    component: () => import(/* webpackChunkName: "course-manage" */ './course-manage.vue'),
    name,
    meta: {
      name: 'course-manage'
    },
    children: [
      {
        path: 'profession-list',
        component: () => import(/* webpackChunkName: "profession-list" */ './components/profession-list.vue'),
        meta: {
          name: '专业列表'
        }
      },
      {
        path: 'approve-all',
        component: () => import(/* webpackChunkName: "approve-all" */ './components/course-approve-all.vue'),
        meta: {
          name: '全部审批'
        }
      },
      {
        path: 'i-initiated',
        component: () => import(/* webpackChunkName: "i-initiated" */ './components/course-i-initiated.vue'),
        meta: {
          name: '我的审批'
        }
      },
      {
        path: 'course-list',
        component: () => import(/* webpackChunkName: "course-list" */ './components/course-list.vue'),
        meta: {
          name: '课程管理'
        }
      },
      {
        path: 'course-preview/:id',
        component: () => import(/* webpackChunkName: "course-preview" */ './components/course-preview.vue'),
        meta: {
          name: '课程预览'
        }
      },
      {
        path: 'statistics',
        component: () => import(/* webpackChunkName: "statistics" */ './components/course-statistics.vue'),
        meta: {
          name: '数据统计'
        }
      },
      {
        path: 'wrong-questions',
        component: () => import(/* webpackChunkName: "wrong-questions" */ './components/wrong-questions.vue'),
        meta: {
          name: '错题统计'
        }
      },
      {
        path: 'graph-statistics',
        component: () => import(/* webpackChunkName: "graph-statistics" */ './components/graph-statistics.vue'),
        meta: {
          name: '图谱统计'
        }
      },
      {
        path: 'scp-course/:courseId/:knowledgeSubjectId/:status/:auditStatus/:code/:majorId',
        component: () => import(/* webpackChunkName: "scp-course" */ './components/scp-course.vue'),
        meta: {
          name: '课程建设'
        }
      },
      {
        path: 'iapproved',
        component: () => import(/* webpackChunkName: "course-manage" */ './components/pkg-i-initiated.vue'),
        meta: {
          name: '全部审批'
        }
      },
      {
        path: 'initiatepkg',
        component: () => import(/* webpackChunkName: "initiatepkg" */ './components/pkg-approve-all.vue'),
        meta: {
          name: '我发起的'
        }
      },
      {
        path: 'scp-list',
        component: () => import(/* webpackChunkName: "scp-list" */ './components/scp-list.vue'),
        meta: {
          name: '课包列表'
        }
      },
      {
        path: 'prepare-course',
        component: () => import(/* webpackChunkName: "prepare-course" */ './components/prepare-course.vue'),
        meta: {
          name: '课包建设'
        }
      },
      {
        path: 'series-management',
        component: () => import(/* webpackChunkName: "series-management" */ './components/series-management.vue'),
        meta: {
          name: '系列管理'
        }
      },
      {
        path: 'operation-log',
        component: () => import(/* webpackChunkName: "operation-log" */ './components/operation-log.vue'),
        meta: {
          name: '操作日志'
        }
      },
      {
        path: 'feedback-statistics',
        component: () => import(/* webpackChunkName: "feedback-statistics" */'./components/feedback-statistics.vue'),
        meta: {
          name: '反馈统计'
        }
      },
      {
        path: 'package-overview',
        component: () => import(/* webpackChunkName: "package-overview" */ './components/package-overview.vue'),
        meta: {
          name: '课包概况'
        }
      }
    ]
  }
}
