export const subApps = [
  {
    sort: 1,
    fdAppId: "reactapp-1",
    fdAppName: "react-app", // 对应子应用中package.json中的name
    fdAppUrl: "http://localhost:3001", // 应用部署地址
    fdParent: {
      fdAppId: "1hi31081q1f9i0f12vfkpas3vsdq513ju7qt",
      fdAppName: "微前端demo",
      fdAppTabId: "1hj73u0s43n0gla3bb0s11k9bf2r29k6li09",
      fdAppTabName: "React"
    },
    fdRemark: "react-app子应用"
  },
  {
    sort: 2,
    fdAppId: "vue2app-1",
    fdAppName: "vue2-app", // 对应子应用中package.json中的name
    fdAppUrl: "http://localhost:8080", // 应用部署地址
    fdParent: {
      fdAppId: "1hi31081q1f9i0f12vfkpas3vsdq513ju7qt",
      fdAppName: "微前端demo",
      fdAppTabId: "1hj73tgj61mf717d1k0i90k21tuin41e4c0j",
      fdAppTabName: "Vue2"
    },
    fdRemark: "vue2-app子应用"
  },
  {
    sort: 3,
    fdAppId: "vue3app-1",
    fdAppName: "vue3-app", // 对应子应用中package.json中的name
    fdAppUrl: "http://localhost:8081", // 应用部署地址
    fdParent: {
      fdAppId: "1hi31081q1f9i0f12vfkpas3vsdq513ju7qt",
      fdAppName: "微前端demo",
      fdAppTabId: "1hj73tgj61mf717d1k0i90k21tuin41e4c0j",
      fdAppTabName: "Vue3"
    },
    fdRemark: "vue3-app子应用"
  },
  {
    sort: 4,
    fdAppId: "emergency-plan",
    fdAppName: "emergency-plan", // 对应子应用中package.json中的name
    fdAppUrl: "http://localhost:3031/emergency-plan", // 应用部署地址
    fdParent: {
      fdAppId: "1hi31081q1f9i0f12vfkpas3vsdq513ju7qt",
      fdAppName: "应急预案",
      fdAppTabId: "1hj73tgj61mf717d1k0i90k21tuin41e4c0j",
      fdAppTabName: "应急预案"
    },
    fdRemark: "安信应急预案应用"
  }
]