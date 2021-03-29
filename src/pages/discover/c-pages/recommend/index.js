import React, { memo } from 'react';


import {
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from "./style"

import HYTopBanner from "./c-cpns/top-banner";
import HYHotRecommend from "./c-cpns/hot-recommend";
import HYNewAlbum from "./c-cpns/new-album";

import HYRanking from "./c-cpns/recommend-ranking"



function HYRecommend(props) {


    return (
        <RecommendWrapper>
            <HYTopBanner>
            </HYTopBanner>
            <Content className="wrap-v2">
                <RecommendLeft>
                    <HYHotRecommend></HYHotRecommend>
                    <HYNewAlbum></HYNewAlbum>
                    <HYRanking></HYRanking>
                </RecommendLeft>
                <RecommendRight></RecommendRight>
            </Content>

        </RecommendWrapper>
    )
}

// const mapStateToProps=state=>({
//     topBanners:state.recommend.topBanners

// })
// const mapDispatchToProps=dispatch=>({
//     getBanners:()=>{
//         dispatch(getTopBannerAction())
//     }
// })
export default memo(HYRecommend)