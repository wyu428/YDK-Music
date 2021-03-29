import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getTopBannerAction } from "../../store/actioncreators";

import { Carousel } from 'antd';

import {
    BannerWrapper,
    BannerLeft,
    BannerRight,
    BannerControl

} from "./style"

export default memo(function HYTopBanner() {

    const [currentIndex, setcurrentIndex] = useState(0)


    const { topBanners } = useSelector(state => ({
        topBanners: state.getIn(["recommend", "topBanners"])
    }), shallowEqual)
    const bannerRef = useRef()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopBannerAction())
    }, [dispatch])

    const bannerchange = useCallback(
        (from, to) => {
            setTimeout(() => {
                setcurrentIndex(to)
            }, 0)
        },
        [],
    )

    const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")

    return (
        <BannerWrapper bgImage={bgImage}>
            <div className="banner wrap-v2">
                <BannerLeft>
                    <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerchange}>
                        {
                            topBanners.map((item, index) => {
                                return (
                                    <div className="banner-item" key={item.imageUrl}>
                                        <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                                    </div>
                                )
                            })
                        }

                    </Carousel>,
                </BannerLeft>
                <BannerRight>

                </BannerRight>
                <BannerControl>
                    <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
                    <button className="btn right" onClick={e => bannerRef.current.next()}></button>
                </BannerControl>
            </div>



        </BannerWrapper>
    )
})
