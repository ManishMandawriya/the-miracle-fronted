import { Dispatch } from "react"


export const selectSong = (song: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: 'SONG_SELECTED',
            payload: song
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SONG_SELECTED_FAIL',
            payload: "SONG_SELECTED_FAIL"
        });
    }
};

// export const selectSong = (song:any) => {
//    return {
//         type: "SONG_SELECTED",
//         payload: song,
//     };
// };


export const selectSongById = (id: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SONG_SELECTED_BY_ID",
            payload: id,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SONG_SELECTED_BY_ID_FAIL',
            payload: "SONG_SELECTED_BY_ID_FAIL"
        });
    }
};

export const setPlayerState = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "PLAYER_STATE_SELECTED",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'PLAYER_STATE_SELECTED_FAIL',
            payload: "PLAYER_STATE_SELECTED_FAIL"
        });
    }
};

export const setVolume = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_VOLUME",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_VOLUME_FAIL',
            payload: "SET_VOLUME_FAIL"
        });
    }
};

export const setDuration = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_DURATION",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_DURATION_FAIL',
            payload: "SET_DURATION_FAIL"
        });
    }
};

export const setCurrentLocation = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_CURRENT_LOCATION",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_CURRENT_LOCATION_FAIL',
            payload: "SET_CURRENT_LOCATION_FAIL"
        });
    }
};


export const setPlayerPlaying = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "PLAYER_PLAYING",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'PLAYER_PLAYING_FAIL',
            payload: "PLAYER_PLAYING_FAIL"
        });
    }
};



export const setSpeed = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_SPEED",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_SPEED_FAIL',
            payload: "SET_SPEED_FAIL"
        });
    }
};


export const CurrentSongDetails = (details: any) => async (dispatch: Dispatch<any>) => {

    try {
        dispatch({
            type: 'CURRENT_STORY_DETAILS_SELECTED',
            payload: details
        })
    }
    catch (error: any) {
        dispatch({
            type: 'CURRENT_STORY_DETAILS_FAIL',
            payload: "CURRENT_STORY_DETAILS_FAIL"
        });
    }
};



export const Playlist = (list: any) => async (dispatch: Dispatch<any>) => {

    try {
        dispatch({
            type: 'PLAYLIST_SELECTED',
            payload: list
        })
    }
    catch (error: any) {
        dispatch({
            type: 'PLAYLIST_SELECTED_FAIL',
            payload: "PLAYLIST_SELECTED_FAIL"
        });
    }
};

/** this action use for current index from playlist array  */
export const currentIndexFromPlaylist = (id: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "PLAYLIST_STORY_CURRENT_INDEX_SUCCESS",
            payload: id,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'PLAYLIST_STORY_CURRENT_INDEX_SUCCESS_FAIL',
            payload: "PLAYLIST_STORY_CURRENT_INDEX_SUCCESS_FAIL"
        });
    }
};


export const ShuffledAction = (shuff: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SHUFFLED_SELECTED",
            payload: shuff,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SHUFFLED_FAIL',
            payload: 'SHUFFLED_FAIL'
        });
    }
};


export const RepeatAction = (repeat: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "REPEAT_SELECTED",
            payload: repeat,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'REPEAT_FAIL',
            payload: 'REPEAT_FAIL'
        });
    }
};

export const setAmbienceVolume = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_AMBIENCE_VOLUME",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_AMBIENCE_VOLUME_FAIL',
            payload: "SET_AMBIENCE_VOLUME_FAIL"
        });
    }
};

export const setSleepHour = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_SLEEP_HOUR",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_SLEEP_HOUR_FAIL',
            payload: "SET_SLEEP_HOUR_FAIL"
        });
    }
};


export const setSleepMinuts = (val: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "SET_SLEEP_MINUTS",
            payload: val,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'SET_SLEEP_MINUTS_FAIL',
            payload: "SET_SLEEP_MINUTS_FAIL"
        });
    }
};

export const AmbienceCurrentAction = (ambience: any) => async (dispatch: Dispatch<any>) => {    
    console.log("ambience Action", ambience);
    
    try {
        dispatch({
            type: "AMBIENCE_CURRENT_SUCCESS",
            payload: ambience,
        })
    }
    catch (error: any) {
        dispatch({
            type: 'AMBIENCE_CURRENT_FAIL',
            payload: "AMBIENCE_CURRENT_FAIL"
        });
    }
};