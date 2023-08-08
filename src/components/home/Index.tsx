"use client"
import React, { useEffect } from 'react'
import HomeBanner from './HomeBanner'
import RecentPlayedSongs from './RecentPlayedSongs'
import WeeklyTop15 from './WeeklyTop15'
import FeaturedArtist from './FeaturedArtist'
import NewRelease from './NewRelease'
import FeaturedAlbum from './FeaturedAlbum'
import TopGenres from './TopGenres'
import LiveRadio from './LiveRadio'
import useMakeRequest from '@/utils/apiHelper'
import Spinner from '../layouts/Spinner'
import { GET_FEATURED_ALBUMS, GET_FEATURED_ARTIST, GET_GENRE, GET_HOME_BANNER, GET_LIVE_RADIO, GET_NEW_RELEASE, GET_RECENT, GET_TOP15_SONG } from '@/constants/IndexConstants'

const Index = () => {

    const { loading, data, error, makeRequest }: any = useMakeRequest();


    useEffect(() => {
        makeRequest(null, "songs/home-page-data")
    }, [])

    useEffect(() => {
        // console.log("data>>>>>>>>>>>>>>>>>>>>>>>", data?.data);
    }, [data])


    return (
        <React.Fragment>
            {
                data?.data?.length > 0 ?
                    data?.data?.map((home_comp_data: any, home_comp_key: any) => {

                        return (
                            <>

                                {home_comp_data?.section_type === GET_HOME_BANNER && <HomeBanner />}
                                {home_comp_data?.section_type === GET_RECENT && <RecentPlayedSongs />}
                                {home_comp_data?.section_type === GET_TOP15_SONG && <WeeklyTop15 HomeDataTop15={home_comp_data} />}
                                {home_comp_data?.section_type === GET_FEATURED_ARTIST && <FeaturedArtist />}
                                {home_comp_data?.section_type === GET_NEW_RELEASE && <NewRelease />}
                                {home_comp_data?.section_type === GET_FEATURED_ALBUMS && <FeaturedAlbum />}
                                {home_comp_data?.section_type === GET_GENRE && <TopGenres />}
                                {home_comp_data?.section_type === GET_LIVE_RADIO && <LiveRadio />}

                            </>
                        )
                    })
                    : ""}
        </React.Fragment>
    )
}

export default Index