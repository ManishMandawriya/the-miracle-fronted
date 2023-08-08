
const initialStateAdmin = {
    loading: true,
    status: false,
    data: null
};


export const songsReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'SONG_SELECTED':
    return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
    default:
     return state;
   }
   
};

export const selectedSongIdReducer = (state = initialStateAdmin, action:any) => {

    // if (action.type === "SONG_SELECTED") {
    //     return action.payload.id;
    // }
    if (action.type === "SONG_SELECTED_BY_ID") {
        //return action.payload;
        //return action.payload.id;
        return {
            loading:false,
            status:true,
            data:action.payload
          }; 
    }
    return state;
};
export const playerStateReducer = (state = initialStateAdmin, action:any) => {
    // if (action.type === "PLAYER_STATE_SELECTED" && !action.payload) {
    //     // return (playerState + 1) % 2;
    //     return {
    //         loading:false,
    //         status:true,
    //         data: (0 + 1) % 2
    //       }; 

    // } else if (action.type === "PLAYER_STATE_SELECTED" && action.payload) {
    //     // return action.payload;
    //     return {
    //         loading:false,
    //         status:true,
    //         data: action.payload
    //       };

    // }
    // return state;

    switch (action.type) {
        case 'PLAYER_STATE_SELECTED':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }


};

export const volumeReducer = (state = initialStateAdmin, action:any) => {
    // if (action.type === "SET_VOLUME") {
    //     return action.payload;
    // }
    // return volume;
    switch (action.type) {
        case 'SET_VOLUME':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }
};

export const durationReducer = (duration = 0, action:any) => {
    if (action.type === "SET_DURATION") {
        return action.payload;
    }
    return duration;
};

export const currentLocationReducer = (loc = 0, action:any) => {
    if (action.type === "SET_CURRENT_LOCATION") {
        return action.payload;
    }
    return loc;
};


export const PlayerPlayingReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'PLAYER_PLAYING':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }


};


export const speedReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'SET_SPEED':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }
    
};

export const currentStoryDetailsReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'CURRENT_STORY_DETAILS_SELECTED':
    
        return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
  
    default:
     return state;
   }
   
};


export const playlistReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
    
    case 'PLAYLIST_SELECTED':
    return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
    default:
     return state;
   }
   
};

export const currentIndexFromPlaylistReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'PLAYLIST_STORY_CURRENT_INDEX_SUCCESS':
    return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
    default:
     return state;
   }
 };


 export const shuffledReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'SHUFFLED_SELECTED':
    return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
    default:
     return state;
   }
 };

 export const repeatReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'REPEAT_SELECTED':
    return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
    default:
     return state;
   }
 };

 export const setAmbienceVolumeReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'SET_AMBIENCE_VOLUME':
    return {
            loading:false,
            status:true,
            data:action?.payload
        }; 
    default:
     return state;
   }
 };

 export const SleepHourReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'SET_SLEEP_HOUR':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }
};

export const SleepMinutsReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
        case 'SET_SLEEP_MINUTS':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }
};

export const AmbienceCurrentReducer = (state = initialStateAdmin, action:any) => {
    switch (action.type) {
      
        case 'AMBIENCE_CURRENT_SUCCESS':
            return {
                loading:false,
                status:true,
                data:action?.payload
            }; 
            default:
                return state;
    }
};

