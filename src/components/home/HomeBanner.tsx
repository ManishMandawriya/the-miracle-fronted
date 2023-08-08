import React from 'react'

const HomeBanner = () => {
    return (
        <>
            <div className="ms-banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="ms_banner_img">
                                <img src="assets/images/banner.png" alt="" className="img-fluid" />
                            </div>
                            <div className="ms_banner_text">
                                <h1>This Month’s</h1>
                                <h1 className="ms_color">Record Breaking Albums !</h1>
                                <p>Dream your moments, Until I Met You, Gimme Some Courage, Dark Alley, One More Of A Stranger, Endless<br/> Things, The Heartbeat Stops, Walking Promises, Desired Games and many more...</p>
                                <div className="ms_banner_btn">
                                    <a href="#" className="ms_btn">Listen Now</a>
                                    <a href="#" className="ms_btn">Add To Queue</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeBanner