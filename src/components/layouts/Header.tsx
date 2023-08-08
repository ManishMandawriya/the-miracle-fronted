import React from 'react'

const Header = () => {

  
  return (
    <>
      <div className="ms_header">
        <div className="ms_top_left">
          <div className="ms_top_search">
            <input type="text" className="form-control" placeholder="Search Music Here.." />
            <span className="search_icon">
              <img src="assets/images/svg/search.svg" alt="" />
            </span>
          </div>
          <div className="ms_top_trend">
            <span><a href="#" className="ms_color">Trending Songs :</a></span> <span className="top_marquee"><a href="#">Dream your moments, Until I Met You, Gimme Some Courage, Dark Alley (+8 More)</a></span>
          </div>
        </div>
        <div className="ms_top_right">
          <div className="ms_top_lang">
            <span data-bs-toggle="modal" data-target="#lang_modal">languages <img src="assets/images/svg/lang.svg" alt="" /></span>
          </div>
          <div className="ms_top_btn">
            <a href="javascript:;" className="ms_btn reg_btn" data-bs-toggle="modal" data-bs-target="#myModal"><span>register</span></a>
            <a href="javascript:;" className="ms_btn login_btn" data-bs-toggle="modal" data-bs-target="#myModal1"><span>login</span></a>
          </div>
        </div>
      </div>



    </>
  )
}

export default Header