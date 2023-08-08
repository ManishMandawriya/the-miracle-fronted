import { selectSong, setPlayerState } from '@/redux/actions/PlayerAction';
import useMakeRequest from '@/utils/apiHelper';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AudioPlayer = () => {

    const dispatch = useDispatch<any>()
    const [playerVolume, setPlayerVolume] = useState<any>(50);
    const currentSelectSongData = useSelector((state: any) => state.songs);
    const playerState = useSelector((state: any) => state.playerState);
    const { data: userData, makeRequest }: any = useMakeRequest();
    let audioRef: any = document.getElementById("mainPlayer")


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
        makeRequest(null, 'users/profile')
    }, [])

    useEffect(() => {
        if (userData?.data?.last_played_song) {
            dispatch(selectSong([userData?.data?.last_played_song]))
        }
    }, [userData?.data])

    return (
        <>
            <audio
                ref={audioRef}
                id="mainPlayer"
                src={currentSelectSongData?.data && currentSelectSongData?.data[0]?.media?.audio_file_path}
                autoPlay={true}
                hidden={true}
                preload="true"
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
                                        <li><a href="#"><span className="song_optn_icon"><i className="ms_icon icon_download"></i></span>download now</a></li>
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
                                        <button className="jp-previous" tabIndex={0}>
                                            <i className="ms_play_control"></i>
                                        </button>

                                        <button className="jp-play" tabIndex={0} onClick={handlePlayMusic}>
                                            <i className="ms_play_control"></i>
                                        </button>

                                        <button className="jp-next" tabIndex={0}>
                                            <i className="ms_play_control"></i>
                                        </button>
                                    </div>
                                    <div className="jp-progress-container flex-item">
                                        <div className="jp-time-holder">
                                            <span className="jp-current-time" role="timer" aria-label="time">&nbsp;</span>
                                            <span className="jp-duration" role="timer" aria-label="duration">&nbsp;</span>
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
                                                <div className="knob-wrapper">
                                                    <div className="knob-mask">
                                                        <div className="knob d3"><span></span></div>
                                                        <div className="handle"></div>
                                                        <div className="round">
                                                            <img src="assets/images/svg/volume.svg" alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="jp-toggles flex-item">
                                        <button className="jp-shuffle" tabIndex={0} title="Shuffle">
                                            <i className="ms_play_control"></i></button>
                                        <button className="jp-repeat" tabIndex={0} title="Repeat"><i className="ms_play_control"></i></button>
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
    )
}

export default AudioPlayer