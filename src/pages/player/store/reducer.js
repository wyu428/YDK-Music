import {Map} from "immutable"


import * as actionTypes from "./constant"


const defaultState= Map({
    currentSong:{},
    playlist:[],
    currentSongIndex:0,
    sequence:0,
    lyricList:[],
    lyricCurrentIndex:0
})
function reducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_CURRENT_SONG:
            return state.set("currentSong",action.currentSong)
        case actionTypes.CHANGE_CURRENT_INDEX:
            return state.set("currentSongIndex",action.index)
        case actionTypes.CHANGE_PLAY_LIST:
            return state.set("playlist",action.playlist)
        case actionTypes.CHANGE_SEQUENCE:
            return state.set("sequence",action.sequence)
        case actionTypes.CHANGE_LYRICS_LIST:
            return state.set("lyricList",action.lyricList)
        case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
            return state.set("lyricCurrentIndex",action.index)
        default:
            return state
    }
}
export default reducer