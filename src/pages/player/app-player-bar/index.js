import { Slider } from 'antd'
import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"


import { getSizeImage, formatDate, getPlaySong } from "@/utils/data-format"
import { getSongDetailAction, changeSequenceAction, changeCurrentSong, changeCurrentLyricIndex } from "../store/createactions"

import {message} from "antd"
import HYAppPlayerList from "../app-player-list"

import {
    PlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from "./style"


import { NavLink } from 'react-router-dom'

export default memo(function HYAppPlayerBar() {
    const dispatch = useDispatch()
    const { currentSong, sequence, lyricList, lyricCurrentIndex } = useSelector(state => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player", "sequence"]),
        lyricList: state.getIn(["player", "lyricList"]),
        lyricCurrentIndex: state.getIn(["player", "lyricCurrentIndex"])

    }), shallowEqual)

    const [currentTime, setCurrentTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isChange, setisChange] = useState(false)
    const [isplaying, setisplaying] = useState(false)


    const audioRef = useRef()
    useEffect(() => {
        dispatch(getSongDetailAction(167876));
    }, [dispatch])

    useEffect(() => {
        audioRef.current.src = getPlaySong(currentSong.id);
        audioRef.current.play().then(res => {
            setisplaying(true)
        }).catch(err => {
            setisplaying(false)
        }

        )


    }, [currentSong])

    const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
    const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手"
    const duration = currentSong.dt || 0
    const showDuration = formatDate(duration, "mm:ss")
    const showCurrentTime = formatDate(currentTime, "mm:ss")



    const changeSequence = () => {
        let currentSequence = sequence + 1

        if (currentSequence > 2) {
            currentSequence = 0

        }
        dispatch(changeSequenceAction(currentSequence))
    }


    const changeMusic = (tag) => {
        dispatch(changeCurrentSong(tag))
    }

    const handleMusicEnded = () => {
        if (sequence === 2) {//单曲循环
            audioRef.current.currentTime = 0;
            audioRef.current.play()
        } else {
            dispatch(changeCurrentSong(1))
        }
    }
    const playMusic = useCallback(() => {
        isplaying ? audioRef.current.pause() : audioRef.current.play()
        setisplaying(!isplaying)
    }, [isplaying])
    const timeUpdate = (e) => {
        const currentTime = e.target.currentTime
        if (!isChange) {

            setProgress(currentTime * 1000 / duration * 100)
            setCurrentTime(currentTime * 1000)
        }
        let currentLyricIndex = 0;
        for (let i = 0; i < lyricList.length; i++) {
            let lyricItem = lyricList[i]
            if (currentTime * 1000 < lyricItem.time) {
                currentLyricIndex = i
                break
            }  
        }
        if (lyricCurrentIndex !==currentLyricIndex - 1) {
            dispatch(changeCurrentLyricIndex(currentLyricIndex - 1))
            const content=lyricList[currentLyricIndex - 1]&&lyricList[currentLyricIndex - 1].content
            message.open({
                key:"lyric",
                content:content,
                duration:0,
                className:"lyric-class"
            })
        }
        // console.log(lyricList[currentLyricIndex-1]);
        //前一句歌词


    }
    const sliderChange = useCallback((value) => {
        setisChange(true)
        const currentTime = value / 100 * duration
        setCurrentTime(currentTime)
        setProgress(value)


    }, [duration])
    const sliderAfterChange = useCallback((value) => {
        const currentTime = value / 100 * duration / 1000
        audioRef.current.currentTime = currentTime
        setCurrentTime(currentTime * 1000)
        setisChange(false)
        if (!isplaying) {
            playMusic()
        }
    }, [duration, isplaying, playMusic])

    return (
        <PlaybarWrapper className="sprite_player">
            <div className="content wrap-v2">
                <Control isPlaying={isplaying}>
                    <button className="sprite_player prev" onClick={e => changeMusic(-1)}></button>
                    <button className="sprite_player play" onClick={e => playMusic()}></button>
                    <button className="sprite_player next" onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    <div className="image">
                        <NavLink to="/discover/player">
                            <img src={getSizeImage(picUrl, 35)} alt="" />
                        </NavLink>
                    </div>
                    <div className="info">
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href="#/" className="singer-name">{singerName}</a>
                        </div>
                        <div className="progress">
                            <Slider defaultValue={30} value={progress} onChange={sliderChange}
                                onAfterChange={sliderAfterChange}></Slider>
                            <div className="time">
                                <span className="now-time">{showCurrentTime}</span>
                                <span className="divider">/</span>
                                <span className="duration">{showDuration}</span>
                            </div>
                        </div>
                    </div>
                    <div className="info"></div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_player">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
                        <button className="sprite_player btn playlist"></button>
                    </div>
                </Operator>
            </div>
            <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded}></audio>
            <HYAppPlayerList></HYAppPlayerList>
        </PlaybarWrapper>
    )
})
