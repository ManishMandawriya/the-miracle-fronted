import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ToggleLoginRegisterReducer } from './redux/reducers/CustomReducer'
import { AmbienceCurrentReducer, PlayerPlayingReducer, SleepHourReducer, SleepMinutsReducer, currentIndexFromPlaylistReducer, currentLocationReducer, currentStoryDetailsReducer, durationReducer, playerStateReducer, playlistReducer, repeatReducer, selectedSongIdReducer, setAmbienceVolumeReducer, shuffledReducer, songsReducer, speedReducer, volumeReducer } from './redux/reducers/PlayerReducer'

const rootReducer = combineReducers({
    ToggleLoginRegisterState: ToggleLoginRegisterReducer,


    //Player
    songs: songsReducer,
    selectedSongId: selectedSongIdReducer,
    playerState: playerStateReducer,
    volume: volumeReducer,
    duration: durationReducer,
    currentLocation: currentLocationReducer,
    playerPlayingState: PlayerPlayingReducer,
    speed: speedReducer,
    currentStoryDetails: currentStoryDetailsReducer,
    playlistState: playlistReducer,
    playlistCurrentIndexState: currentIndexFromPlaylistReducer,
    shuffleState: shuffledReducer,
    repeatState: repeatReducer,
    ambienceVolumeState: setAmbienceVolumeReducer,
    sleepHour: SleepHourReducer,
    sleepMinuts: SleepMinutsReducer,
    AmbienceCurrentState: AmbienceCurrentReducer,

})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
}) 
