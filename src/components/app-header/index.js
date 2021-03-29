import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { headerLinks } from "@/common/local-data";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
    HeaderWrapper,
    HeaderLeft,
    HeaderRight
} from "./style"


export default memo(function YDAppheader() {

    const showSelectItem = (item, index) => {

        if (index < 3) {
            return (
                <NavLink to={item.link}>{item.title}
                    <i className="sprite_01 icon"></i>
                </NavLink>
            )
        } else {
            return <a href={item.link}>{item.title}</a>
        }

    }

    return (
        <HeaderWrapper>
            <div className="content wrap-v1">
                <HeaderLeft>
                    <a href="#/" className="logo sprite_01">1</a>
                    <div className="select-list">
                        {
                            headerLinks.map((item, index) => {
                                return (
                                    <div key={item.title} className="select-item">
                                        {showSelectItem(item, index)}

                                    </div>
                                )
                            })
                        }
                    </div>

                </HeaderLeft>
                <HeaderRight><Input className="search" placeholder="音乐/视频/用户/电台" prefix={<SearchOutlined />}/>
                
                <div className="center">创作者中心</div>
                <div>登陆</div>
                </HeaderRight>
            </div>
            <div className="divider"></div>
        </HeaderWrapper>
    )
})

