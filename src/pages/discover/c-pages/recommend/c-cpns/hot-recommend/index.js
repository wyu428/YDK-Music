import React, { memo, useEffect } from 'react';


import { HOT_RECOMMEND_LIMIT } from "@/common/constant"

import HYThemeHeaderRCM from "@/components/theme-header-rcm";
import HYSongsCover from "@/components/songs-cover"
import {
    HotRecommendWrapper
} from "./style"


import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getHotRecommendAction } from '../../store/actioncreators';

export default memo(function HYHotRecommend() {

    const dispatch = useDispatch();
    const { hotRecommend } = useSelector((state) => ({
        hotRecommend: state.getIn(["recommend", "hotRecommend"])
        
    }), shallowEqual)


    useEffect(() => {
        dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))

    }, [dispatch])

    return (
        <HotRecommendWrapper>
            <HYThemeHeaderRCM title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]}></HYThemeHeaderRCM>
            <div className="recommend-list">
                {
                    hotRecommend.map((item, index) => {
                        return <HYSongsCover key={item.id} info={item}></HYSongsCover>
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})
