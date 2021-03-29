import { getSongDetail,getLyric } from "@/services/player"

import * as actionTypes from "./constant"

import { getRandomNumber } from "@/utils/math-utils"

import { parseLyric} from "@/utils/parse-lyric"


const changeCurrentSongAction = (currentSong) => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong

})
const changePlayListAction = (playlist) => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playlist

})
const changeCurrentSongIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    index

})

const changeLyricListAction=(lyricList)=>({
    type:actionTypes.CHANGE_LYRICS_LIST,
    lyricList  

})

export const changeCurrentLyricIndex=(index)=>({
    type:actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    index
})

export const changeSequenceAction = (sequence) => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
})

export const changeCurrentSong = (tag) => {

    return (dispatch, getState) => {
        const playlist = getState().getIn(["player", "playlist"])
        const sequence = getState().getIn(["player", "sequence"])
        let currentSongIndex = getState().getIn(["player", "currentSongIndex"])

        
        switch (sequence) {
            case 1://随机播放
                let randomIndex = getRandomNumber(playlist.length);
                while (randomIndex === currentSongIndex) {
                    randomIndex = getRandomNumber(playlist.length)
                }
                currentSongIndex = randomIndex
                break

            default://0顺序播放 2单曲循环
                currentSongIndex += tag
                if (currentSongIndex >= playlist.length) { currentSongIndex = 0 }
                if (currentSongIndex < 0) { currentSongIndex = playlist.length - 1; }
                

        }
        const currentSong = playlist[currentSongIndex]
        dispatch(changeCurrentSongAction(currentSong))
        dispatch(changeCurrentSongIndexAction(currentSongIndex))
       

    }
}

export const getSongDetailAction = (ids) => {
    return (dispatch, getState) => {
        const playlist = getState().getIn(["player", "playlist"])
        const songIndex = playlist.findIndex(song => song.id === ids)
        let song=null 
        if (songIndex !== -1) {
            dispatch(changeCurrentSongIndexAction(songIndex))
             song = playlist[songIndex]
            dispatch(changeCurrentSongAction(song))
        } else {
            getSongDetail(ids).then((res) => {
                song = res.songs && res.songs[0]
                if (!song) return;
                const newPlayList = [...playlist]
                newPlayList.push(song)
                dispatch(changePlayListAction(newPlayList))
                dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
                dispatch(changeCurrentSongAction(song))
                dispatch(getLyricAction(song.id))
            })
        }

        
    }

}
export const getLyricAction=(id)=>{
    return dispatch=>{
       getLyric(id).then(res=>{
        const lyric = res.lrc.lyric;
        const lyricList = parseLyric(lyric);
        dispatch(changeLyricListAction(lyricList))
       })
    }
}