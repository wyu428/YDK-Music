import React, { memo } from 'react'

import { HYAppPlayList } from "./style"

import { useSelector } from "react-redux"

export default memo(function HYAppPlayerList() {
    const { playlist } = useSelector(state => ({
        playlist: state.getIn(["player", "playlist"])
    }))

    return (
        <HYAppPlayList >
            {
                playlist && playlist.map((item, index) => {
                    return (
                        <div key={item.id} className="item">
                            <div className="itemId">{index + 1}</div>
                            <div className="itemName">{item.name}</div>

                        </div>
                    )
                })
            }

        </HYAppPlayList>
    )
})
