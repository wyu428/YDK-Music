import React, { memo, Suspense } from 'react'
import { Provider } from "react-redux"
import { renderRoutes } from "react-router-config"

import routes from "./router"
import store from "./store"


import YDAPPheader from "@/components/app-header"
import YDAPPfooter from "@/components/app-footer"
import { HashRouter } from 'react-router-dom'
import HYAppPlayerBar from "@/pages/player/app-player-bar"

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <YDAPPheader />
        <Suspense fallback={<div>loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <YDAPPfooter />
        <HYAppPlayerBar></HYAppPlayerBar>
      </HashRouter>
    </Provider>

  )
})
