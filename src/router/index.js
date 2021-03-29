
import React from "react";
import { Redirect } from "react-router-dom";

//懒加载
const YDdiscover = React.lazy(() => import("@/pages/discover"));
const HYRecommend = React.lazy(_ => import("../pages/discover/c-pages/recommend"));
const HYRanking = React.lazy(_ => import("../pages/discover/c-pages/ranking"));
const HYSongs = React.lazy(_ => import("../pages/discover/c-pages/songs"));
const HYDjradio = React.lazy(_ => import("../pages/discover/c-pages/djradio"));
const HYArtist = React.lazy(_ => import("../pages/discover/c-pages/artist"));
const HYAlbum = React.lazy(_ => import("../pages/discover/c-pages/album"));
const HYPlayer = React.lazy(_ => import("../pages/player"));

const YDfriend = React.lazy(_ => import("../pages/friend"));
const YDmine = React.lazy(_ => import("../pages/mine"));


// import YDdiscover from "../pages/discover";
// import YDfriend from "../pages/friend";
// import YDmine from "../pages/mine";


// import HYRecommend from "../pages/discover/c-pages/recommend";
// import HYRanking from "../pages/discover/c-pages/ranking";
// import HYSongs from "../pages/discover/c-pages/songs";
// import HYDjradio from "../pages/discover/c-pages/djradio";
// import HYArtist from "../pages/discover/c-pages/artist";
// import HYAlbum from "../pages/discover/c-pages/album";
// import HYPlayer from "../pages/player";




const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover" />
    )
  },
  {
    path: "/mine",
    component: YDmine,

  },
  {
    path: "/discover",
    component: YDdiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to="/discover/recommend" />
        )

      },
      {
        path: "/discover/recommend",
        component: HYRecommend
      },
      {
        path: "/discover/ranking",
        component: HYRanking
      },
      {
        path: "/discover/songs",
        component: HYSongs
      },
      {
        path: "/discover/djradio",

        component: HYDjradio
      },
      {
        path: "/discover/artist",
        component: HYArtist
      },
      {
        path: "/discover/album",
        component: HYAlbum
      },
      {
        path: "/discover/player",
        component: HYPlayer
      }


    ]

  },
  {
    path: "/friend",
    component: YDfriend,

  }
]
export default routes;