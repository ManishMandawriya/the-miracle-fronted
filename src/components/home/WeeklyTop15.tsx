import { isUserLogin } from '@/config/Config';
import { Playlist, selectSong, setPlayerState } from '@/redux/actions/PlayerAction';
import useMakeRequest from '@/utils/apiHelper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const WeeklyTop15 = (props: any) => {
    const dispatch = useDispatch<any>();
    const top15SongsData = props?.HomeDataTop15?.data;
    const showPlayer = useSelector((state: any) => state.playerState);
    const { makeRequest }: any = useMakeRequest();
    let audioRef: any = document.getElementById("mainPlayer")

    const setSong = async (songData: any, index: any) => {
        if(!isUserLogin){
            return toast.warn("Please login to continue")            
        }
        await dispatch(selectSong([songData]))
        await dispatch(setPlayerState({
            'audio_id': songData?.id
        }))
        const data = {
            songs: top15SongsData,
            index,
        }
        await dispatch({ type: "PLAYLIST_STORY_CURRENT_INDEX_SUCCESS", payload: index });
        await dispatch(Playlist(data))
        await makeRequest(songData, `songs/listen`, 'post')
        audioRef.play()
    }


    const pauseSong = () => {
        audioRef.pause()
        dispatch(setPlayerState(null))
    }
    return (
        <>
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>{props?.HomeDataTop15?.title}</h1>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 padding_right40">
                            {
                                top15SongsData?.map((top15: any, key: any) => {
                                    const songCount = (key + 1).toString().padStart(2, '0');
                                    const songTitle = top15?.song_title;
                                    const songDuration = (top15?.duration).slice(3);
                                    const audioImage = top15?.media?.image_file_path;
                                    const isCurrentSong = top15?.id == showPlayer?.data?.audio_id
                                    return (
                                        <>
                                            < div className={`ms_weekly_box ${isCurrentSong && 'ms_active_play'}`}>
                                                <div className="weekly_left">
                                                    <span className="w_top_no">
                                                        {songCount}
                                                    </span>
                                                    <div className="w_top_song">
                                                        <div className="w_tp_song_img">
                                                            <img src={audioImage} alt="" className="img-fluid" />
                                                            <div className="ms_song_overlay">
                                                            </div>
                                                            {
                                                                isCurrentSong ?
                                                                    <div className="ms_play_icon" onClick={pauseSong}>
                                                                        <div className="ms_bars">
                                                                            <div className="bar"></div>
                                                                            <div className="bar"></div>
                                                                            <div className="bar"></div>
                                                                            <div className="bar"></div>
                                                                            <div className="bar"></div>
                                                                            <div className="bar"></div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className="ms_play_icon" onClick={() => setSong(top15, key)}>
                                                                        <img src="assets/images/svg/play.svg" alt="" />
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className="w_tp_song_name">
                                                            <h3><a href="#">{songTitle}</a></h3>
                                                            <p>Ava Cornish</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="weekly_right">
                                                    {/* <span className="w_song_time">5:10</span> */}
                                                    <span className="w_song_time">{songDuration}</span>
                                                    <span className="ms_more_icon" data-other="1">
                                                        <img src="assets/images/svg/more.svg" alt="" />
                                                    </span>
                                                </div>
                                                <ul className="more_option">
                                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                                </ul>
                                            </div>
                                        </>
                                    )
                                })
                            }

                            {/* < div className="ms_weekly_box ms_active_play">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        08
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song8.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <div className="ms_bars">
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Dream Your Moments</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div> */}

                            {/* <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        02
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song2.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Walking Promises</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        03
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song3.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Gimme Some Courage</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        04
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song4.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Desired Games</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        05
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song5.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Dark Alley Acoustic</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 padding_right40">
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        06
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song6.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Walking Promises</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        07
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song7.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Endless Things</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box ms_active_play">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        08
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song8.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <div className="ms_bars">
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                    <div className="bar"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Dream Your Moments</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        09
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song9.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Until I Met You</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        10
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song5.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Gimme Some Courage</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        11
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song2.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Dark Alley Acoustic</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        12
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song11.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">The Heartbeat Stops</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        13
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song12.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">One More Stranger</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        14
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song13.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Walking Promises</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div>
                            <div className="ms_divider"></div>
                            <div className="ms_weekly_box">
                                <div className="weekly_left">
                                    <span className="w_top_no">
                                        15
                                    </span>
                                    <div className="w_top_song">
                                        <div className="w_tp_song_img">
                                            <img src="assets/images/weekly/song14.jpg" alt="" className="img-fluid" />
                                            <div className="ms_song_overlay">
                                            </div>
                                            <div className="ms_play_icon">
                                                <img src="assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className="w_tp_song_name">
                                            <h3><a href="#">Endless Things</a></h3>
                                            <p>Ava Cornish</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weekly_right">
                                    <span className="w_song_time">5:10</span>
                                    <span className="ms_more_icon" data-other="1">
                                        <img src="assets/images/svg/more.svg" alt="" />
                                    </span>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"></span></span>Add To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_dwn"></span></span>Download Now</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_playlst"></span></span>Add To Playlist</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default WeeklyTop15