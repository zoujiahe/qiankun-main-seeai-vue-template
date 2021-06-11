export function ResourceManageRoute (path = 'resource-manage', name = path) {
  return {
    path,
    component: () => import(/* webpackChunkName: "resource-manage" */ './resource-manage.vue'),
    name,
    meta: {
      name: 'resource-manage'
    },
    children: [
      { path: 'read', component: () => import(/* webpackChunkName: "read-lib" */ './components/read-lib.vue') },
      { path: 'case', component: () => import(/* webpackChunkName: "case-lib" */ './components/case-lib.vue') },
      { path: 'setting', component: () => import(/* webpackChunkName: "train-lib" */ './components/train-lib.vue') },
      { path: 'exercise', component: () => import(/* webpackChunkName: "exercise-lib" */ './components/exercise-lib.vue') },
      { path: 'save-train/:type/:id/:professionId', component: () => import(/* webpackChunkName: "save-train" */ './components/save-train.vue') },
      { path: 'material-details/:id/:type/:professionId', component: () => import(/* webpackChunkName: "save-material" */ './components/save-material.vue') },
      { path: 'material-pre-case/:id/:type/:professionId', component: () => import(/* webpackChunkName: "save-material" */ './components/case-preview.vue') }
    ]
  }
}
