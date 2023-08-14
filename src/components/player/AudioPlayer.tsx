import { selectSong, setPlayerState } from '@/redux/actions/PlayerAction';
import useMakeRequest from '@/utils/apiHelper';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery"
import { formatDuration, timeToSeconds } from '@/utils/helper';
import { isUserLogin } from '@/config/Config';
import Switch from "react-switch";

const AudioPlayer = () => {

    const dispatch = useDispatch<any>()
    const [playerVolume, setPlayerVolume] = useState<any>(0.5);
    const [clickedTime, setClickedTime] = useState(null)
    const [loop, setLoop] = useState(false)
    const [currentTime, setCurrentTime] = useState('00:00')
    const [duration, setDuration] = useState('00:00')
    const [autoPlay, setAutoPlay] = useState<any>(false)

    const currentSelectSongData = useSelector((state: any) => state.songs);
    const playerState = useSelector((state: any) => state.playerState);
    const playlistState = useSelector((state: any) => state.playlistState)
    const PlaylistStoryCurrentIndex = useSelector((state: any) => state.playlistCurrentIndexState);

    const audioRef: any = document.getElementById("mainPlayer")

    const { data: userData, makeRequest }: any = useMakeRequest();

    useEffect(() => {
        if (isUserLogin) {
            makeRequest(null, 'users/profile')
        }
    }, [])

    useEffect(() => {
        if (userData?.data?.last_played_song) {
            dispatch(selectSong([userData?.data?.last_played_song]))
        }
    }, [userData?.data])


    useEffect(() => {
        var timeDrag = false;
        $('.jp-play-bar').mousedown(function (e) {
            timeDrag = true;
            updatebar(e.pageX);
        });
        $(document).mouseup(function (e) {
            if (timeDrag) {
                timeDrag = false;
                updatebar(e.pageX);
            }
        });
        $(document).mousemove(function (e) {
            if (timeDrag) {
                updatebar(e.pageX);
            }
        });

        var updatebar = function (x: any) {
            var progress: any = $('.jp-progress');
            var position = x - progress.offset().left;
            var percentage = 100 * position / progress.width();
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            $('.jp-play-bar').css('width', percentage + '%');

            let songDuration: any = (percentage / 100) * timeToSeconds(currentSelectSongData?.data && currentSelectSongData?.data[0]?.duration);
            setClickedTime(songDuration)
        };
    })

    if (clickedTime && clickedTime !== audioRef?.currentTime) {
        audioRef.currentTime = clickedTime;
        setClickedTime(null)
    }


    useEffect(() => {
        if (audioRef) {
            const audioElement: any = audioRef.current;

            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        };
    }, [audioRef]);

    console.log('autoPlay outside---------------->',autoPlay);
    const handleTimeUpdate = async () => {
    console.log('autoPlay inside---------------->',autoPlay);
        
        if (audioRef.current.currentTime == audioRef?.duration) {
            if (autoPlay) {
                console.log('autoPlay-------------->',autoPlay)
                next()
            } else {
                await dispatch(setPlayerState(null))
            }
        }
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const percentage = (currentTime / duration) * 100;
        $('.jp-play-bar').css('width', percentage + '%');
        const currentT: any = formatDuration(audioRef.current.currentTime)
        setCurrentTime(currentT)
    };

    const handleLoadedMetadata = () => {
        const dur: any = formatDuration(audioRef?.duration)
        setDuration(dur);
    };



    const handlePlayMusic = async () => {
        if (playerState?.data) {
            await audioRef.pause();
            await dispatch(setPlayerState(null))
        } else {
            await audioRef.play();
            await dispatch(setPlayerState({
                'audio_id': currentSelectSongData?.data[0]?.id
            }))
        }
    }

    useEffect(() => {
        if (audioRef) {
            audioRef.volume = playerVolume;
        }
    }, [playerVolume]);

    const handleSetVolume = (volume: any) => {
        const normalizedVolume = volume / 10;
        setPlayerVolume(normalizedVolume);
    }

    const next = async () => {
        let next = playlistState?.data && playlistState?.data?.songs[PlaylistStoryCurrentIndex?.data + 1]
        console.log('next>>>>>>>>>>>', next);

        await dispatch({ type: "PLAYLIST_STORY_CURRENT_INDEX_SUCCESS", payload: PlaylistStoryCurrentIndex?.data + 1 });
        await dispatch(selectSong([next]))
        await dispatch(setPlayerState({ 'audio_id': next?.id }))
        await makeRequest(next, `songs/listen`, 'post')
    }

    const previous = async () => {
        let previous = playlistState?.data && playlistState?.data?.songs[PlaylistStoryCurrentIndex?.data - 1]
        await dispatch({ type: "PLAYLIST_STORY_CURRENT_INDEX_SUCCESS", payload: PlaylistStoryCurrentIndex?.data - 1 });
        await dispatch(selectSong([previous]))
        await dispatch(setPlayerState({ 'audio_id': previous?.id }))
        await makeRequest(previous, `songs/listen`, 'post')
    }

    const repeat = () => {
        setLoop(loop === true ? false : true)
    }

    const handleDownload = (songUrl: any, songName: any) => {

    }

    const fileUrl = 'http://localhost/NestJs_Projects/the-miracle-backend/public/uploads/audio/ea2846c310723711dd67105417378a2c3.mp3';
    const filename = 'beautiful-carpathia.jpg';


    return (
        <>
            {
                isUserLogin &&
                <>
                    <audio
                        ref={audioRef}
                        id="mainPlayer"
                        src={currentSelectSongData?.data && currentSelectSongData?.data[0]?.media?.audio_file_path}
                        autoPlay={true}
                        hidden={true}
                        preload="true"
                        loop={loop}
                    />

                    <div className="ms_player_wrapper">
                        <div className="ms_player_close">
                            <i className="fa fa-angle-up" aria-hidden="true"></i>
                        </div>
                        <div className="player_mid">
                            <div className="audio-player">
                                <div id="jquery_jplayer_1" className="jp-jplayer"></div>
                                <div id="jp_container_1 " className={`jp-audio ${playerState?.data && 'jp-state-playing'}`} role="application" aria-label="media player">
                                    <div className="player_left">
                                        <div className="ms_play_song">
                                            <div className="play_song_name">
                                                <a href="javascript:void(0);" id="playlist-text">
                                                    <div className="jp-now-playing flex-item">
                                                        {
                                                            currentSelectSongData?.data &&
                                                            <div className='jp-track-name'>
                                                                <span className='que_img'>
                                                                    <img src={currentSelectSongData?.data[0]?.media?.image_file_path} width={'50px'} /></span>
                                                                <div className='que_data'>{currentSelectSongData?.data[0]?.song_title} <div className='jp-artist-name'>{'Alan walker'}</div></div>
                                                            </div>
                                                        }
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="play_song_options">
                                            <ul>
                                                {/* <li><a href='#' onClick={() => handleDownload(currentSelectSongData?.data && currentSelectSongData?.data[0]?.media?.audio_file_path)}><span className="song_optn_icon"><i className="ms_icon icon_download"></i></span>download now</a></li> */}
                                                <li><a href='#' onClick={() => handleDownload(fileUrl, filename)}><span className="song_optn_icon"><i className="ms_icon icon_download"></i></span>download now</a></li>
                                                <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_fav"></i></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_playlist"></i></span>Add To Playlist</a></li>
                                                <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_share"></i></span>Share</a></li>
                                            </ul>
                                        </div>
                                        <span className="play-left-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                                    </div>
                                    {/* Right Queue */}
                                    <div className="jp_queue_wrapper">
                                        <span className="que_text" id="myPlaylistQueue"><i className="fa fa-angle-up" aria-hidden="true"></i> queue</span>
                                        <div id="playlist-wrap" className="jp-playlist">
                                            <div className="jp_queue_cls"><i className="fa fa-times" aria-hidden="true"></i></div>
                                            <h2>queue</h2>
                                            <div className="jp_queue_list_inner">
                                                <ul>
                                                    <li>&nbsp;</li>
                                                </ul>
                                            </div>
                                            <div className="jp_queue_btn">
                                                <a href="javascript:;" className="ms_clear" data-toggle="modal" data-target="#clear_modal">clear</a>
                                                <a href="clear_modal.html" className="ms_save" data-toggle="modal" data-target="#save_modal">save</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="jp-type-playlist">
                                        <div className="jp-gui jp-interface flex-wrap">
                                            <div className="jp-controls flex-item">
                                                {playlistState?.data &&
                                                    <button className="jp-previous" tabIndex={0} onClick={previous} disabled={PlaylistStoryCurrentIndex.data == 0}>
                                                        <i className="ms_play_control"></i>
                                                    </button>
                                                }

                                                <button className="jp-play" tabIndex={0} onClick={handlePlayMusic}>
                                                    <i className="ms_play_control"></i>
                                                </button>

                                                {playlistState?.data &&
                                                    <button className="jp-next" tabIndex={0} onClick={next} disabled={playlistState?.data?.songs?.length == PlaylistStoryCurrentIndex.data + 1}>
                                                        <i className="ms_play_control"></i>
                                                    </button>
                                                }
                                            </div>
                                            <div className="jp-progress-container flex-item">
                                                <div className="jp-time-holder" >
                                                    <span className="jp-current-time" role="timer" aria-label="time">{currentTime}&nbsp;</span>
                                                    <span className="jp-duration" role="timer" aria-label="duration">{duration}&nbsp;</span>

                                                </div>
                                                <div className="jp-progress">
                                                    <div className="jp-seek-bar">
                                                        <div className="jp-play-bar">
                                                            <div className="bullet">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="jp-volume-controls flex-item">
                                                <div className="widget knob-container">
                                                    <div className="knob-wrapper-outer">

                                                        {/* <input type="range" min="0" max="10" value={playerVolume} onChange={(e) => handleSetVolume(e?.target?.value)} /> */}
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="10"
                                                            value={playerVolume * 10} // Convert normalized volume back to [0, 10]
                                                            onChange={(e) => handleSetVolume(e.target.value)}
                                                        />

                                                        {/* <div className="knob-wrapper">
                                                    <div className="knob-mask">
                                                        <div className="knob d3"><span></span></div>
                                                        <div className="handle"></div>
                                                        <div className="round">
                                                            <img src="assets/images/svg/volume.svg" alt="" />
                                                        </div>
                                                    </div>
                                                </div> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="jp-toggles flex-item d-flex">
                                                <button className="jp-shuffle" tabIndex={0} title="Shuffle">
                                                    <i className="ms_play_control"></i></button>
                                                <button className="jp-repeat " tabIndex={0} title="Repeat" onClick={repeat}><i className={`ms_play_control ${loop && 'ms_play_control_active'}`}></i></button>
                                                {playlistState?.data && <button><Switch checked={autoPlay} onChange={() => setAutoPlay(autoPlay === true ? false : true)} /></button>}
                                            </div>

                                            <div className="jp_quality_optn custom_select">
                                                <select>
                                                    <option>quality</option>
                                                    <option value="1">HD</option>
                                                    <option value="2">High</option>
                                                    <option value="3">medium</option>
                                                    <option value="4">low</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default AudioPlayer

















































// import { selectSong, setPlayerState } from '@/redux/actions/PlayerAction';
// import useMakeRequest from '@/utils/apiHelper';
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import $ from "jquery"
// import { formatDuration, timeToSeconds } from '@/utils/helper';
// const AudioPlayer = () => {

//     const dispatch = useDispatch<any>()
//     const [playerVolume, setPlayerVolume] = useState<any>(0.5);
//     const [clickedTime, setClickedTime] = useState(null)
//     const [currentTime, setCurrentTime] = useState('00:00')
//     const [duration, setDuration] = useState('00:00')
//     const currentSelectSongData = useSelector((state: any) => state.songs);
//     const playerState = useSelector((state: any) => state.playerState);
//     const { data: userData, makeRequest }: any = useMakeRequest();
//     let audioRef: any = document.getElementById("mainPlayer")


//     useEffect(() => {
//         makeRequest(null, 'users/profile')
//     }, [])

//     useEffect(() => {
//         if (userData?.data?.last_played_song) {
//             dispatch(selectSong([userData?.data?.last_played_song]))
//         }
//     }, [userData?.data])


//     useEffect(() => {
//         var timeDrag = false;
//         $('.jp-play-bar').mousedown(function (e) {
//             timeDrag = true;
//             updatebar(e.pageX);
//         });
//         $(document).mouseup(function (e) {
//             if (timeDrag) {
//                 timeDrag = false;
//                 updatebar(e.pageX);
//             }
//         });
//         $(document).mousemove(function (e) {
//             if (timeDrag) {
//                 updatebar(e.pageX);
//             }
//         });

//         var updatebar = function (x: any) {
//             var progress: any = $('.jp-progress');
//             var position = x - progress.offset().left;
//             var percentage = 100 * position / progress.width();
//             if (percentage > 100) {
//                 percentage = 100;
//             }
//             if (percentage < 0) {
//                 percentage = 0;
//             }
//             $('.jp-play-bar').css('width', percentage + '%');

//             let songDuration: any = (percentage / 100) * timeToSeconds(currentSelectSongData?.data && currentSelectSongData?.data[0]?.duration);
//             setClickedTime(songDuration)
//         };
//     })

//     if (clickedTime && clickedTime !== audioRef?.currentTime) {
//         audioRef.currentTime = clickedTime;
//         setClickedTime(null)
//     }


//     useEffect(() => {
//         if (audioRef) {
//             const audioElement: any = audioRef.current;

//             audioElement.addEventListener('timeupdate', handleTimeUpdate);
//             audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

//             return () => {
//                 audioElement.removeEventListener('timeupdate', handleTimeUpdate);
//                 audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
//             };
//         };
//     }, [audioRef]);

//     const handleTimeUpdate = () => {

//         const currentTime = audioRef.current.currentTime;
//         const duration = audioRef.current.duration;
//         const percentage = (currentTime / duration) * 100;
//         $('.jp-play-bar').css('width', percentage + '%');
//         const currentT: any = formatDuration(audioRef.current.currentTime)
//         setCurrentTime(currentT)
//     };

//     const handleLoadedMetadata = () => {
//         const dur: any = formatDuration(audioRef?.duration)
//         setDuration(dur);
//     };



//     const handlePlayMusic = async () => {
//         if (playerState?.data) {
//             await audioRef.pause();
//             await dispatch(setPlayerState(null))
//         } else {
//             await audioRef.play();
//             await dispatch(setPlayerState({
//                 'audio_id': currentSelectSongData?.data[0]?.id
//             }))
//         }
//     }

//     useEffect(() => {
//         if (audioRef) {
//             audioRef.volume = playerVolume;
//         }
//     }, [playerVolume]);

//     const handleSetVolume = (volume: any) => {
//         const normalizedVolume = volume / 10;
//         setPlayerVolume(normalizedVolume);

//     }

//     return (
//         <>
//             <audio
//                 ref={audioRef}
//                 id="mainPlayer"
//                 src={currentSelectSongData?.data && currentSelectSongData?.data[0]?.media?.audio_file_path}
//                 autoPlay={true}
//                 hidden={true}
//                 preload="true"
//             />

//             <div className="ms_player_wrapper">
//                 <div className="ms_player_close">
//                     <i className="fa fa-angle-up" aria-hidden="true"></i>
//                 </div>
//                 <div className="player_mid">
//                     <div className="audio-player">
//                         <div id="jquery_jplayer_1" className="jp-jplayer"></div>
//                         <div id="jp_container_1 " className={`jp-audio ${playerState?.data && 'jp-state-playing'}`} role="application" aria-label="media player">
//                             <div className="player_left">
//                                 <div className="ms_play_song">
//                                     <div className="play_song_name">
//                                         <a href="javascript:void(0);" id="playlist-text">
//                                             <div className="jp-now-playing flex-item">
//                                                 {
//                                                     currentSelectSongData?.data &&
//                                                     <div className='jp-track-name'>
//                                                         <span className='que_img'>
//                                                             <img src={currentSelectSongData?.data[0]?.media?.image_file_path} width={'50px'} /></span>
//                                                         <div className='que_data'>{currentSelectSongData?.data[0]?.song_title} <div className='jp-artist-name'>{'Alan walker'}</div></div>
//                                                     </div>
//                                                 }
//                                             </div>
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div className="play_song_options">
//                                     <ul>
//                                         <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_download"></i></span>download now</a></li>
//                                         <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_fav"></i></span>Add To Favourites</a></li>
//                                         <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_playlist"></i></span>Add To Playlist</a></li>
//                                         <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_share"></i></span>Share</a></li>
//                                     </ul>
//                                 </div>
//                                 <span className="play-left-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
//                             </div>
//                             {/* Right Queue */}
//                             <div className="jp_queue_wrapper">
//                                 <span className="que_text" id="myPlaylistQueue"><i className="fa fa-angle-up" aria-hidden="true"></i> queue</span>
//                                 <div id="playlist-wrap" className="jp-playlist">
//                                     <div className="jp_queue_cls"><i className="fa fa-times" aria-hidden="true"></i></div>
//                                     <h2>queue</h2>
//                                     <div className="jp_queue_list_inner">
//                                         <ul>
//                                             <li>&nbsp;</li>
//                                         </ul>
//                                     </div>
//                                     <div className="jp_queue_btn">
//                                         <a href="javascript:;" className="ms_clear" data-toggle="modal" data-target="#clear_modal">clear</a>
//                                         <a href="clear_modal.html" className="ms_save" data-toggle="modal" data-target="#save_modal">save</a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="jp-type-playlist">
//                                 <div className="jp-gui jp-interface flex-wrap">
//                                     <div className="jp-controls flex-item">
//                                         <button className="jp-previous" tabIndex={0}>
//                                             <i className="ms_play_control"></i>
//                                         </button>

//                                         <button className="jp-play" tabIndex={0} onClick={handlePlayMusic}>
//                                             <i className="ms_play_control"></i>
//                                         </button>

//                                         <button className="jp-next" tabIndex={0}>
//                                             <i className="ms_play_control"></i>
//                                         </button>
//                                     </div>
//                                     <div className="jp-progress-container flex-item">
//                                         <div className="jp-time-holder" >
//                                             <span className="jp-current-time" role="timer" aria-label="time">{currentTime}&nbsp;</span>
//                                             <span className="jp-duration" role="timer" aria-label="duration">{duration}&nbsp;</span>

//                                         </div>
//                                         <div className="jp-progress">
//                                             <div className="jp-seek-bar">
//                                                 <div className="jp-play-bar">
//                                                     <div className="bullet">
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="jp-volume-controls flex-item">
//                                         <div className="widget knob-container">
//                                             <div className="knob-wrapper-outer">

//                                                 {/* <input type="range" min="0" max="10" value={playerVolume} onChange={(e) => handleSetVolume(e?.target?.value)} /> */}
//                                                 <input
//                                                     type="range"
//                                                     min="0"
//                                                     max="10"
//                                                     value={playerVolume * 10} // Convert normalized volume back to [0, 10]
//                                                     onChange={(e) => handleSetVolume(e.target.value)}
//                                                 />

//                                                 {/* <div className="knob-wrapper">
//                                                     <div className="knob-mask">
//                                                         <div className="knob d3"><span></span></div>
//                                                         <div className="handle"></div>
//                                                         <div className="round">
//                                                             <img src="assets/images/svg/volume.svg" alt="" />
//                                                         </div>
//                                                     </div>
//                                                 </div> */}

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="jp-toggles flex-item">
//                                         <button className="jp-shuffle" tabIndex={0} title="Shuffle">
//                                             <i className="ms_play_control"></i></button>
//                                         <button className="jp-repeat" tabIndex={0} title="Repeat"><i className="ms_play_control"></i></button>
//                                     </div>

//                                     <div className="jp_quality_optn custom_select">
//                                         <select>
//                                             <option>quality</option>
//                                             <option value="1">HD</option>
//                                             <option value="2">High</option>
//                                             <option value="3">medium</option>
//                                             <option value="4">low</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default AudioPlayer