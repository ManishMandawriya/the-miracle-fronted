import React from 'react'

const Modals = () => {
    return (
        <>
            <div className="ms_register_popup">
                <div id="myModal" className="modal  centered-modal" role="dialog">
                    <div className="modal-dialog register_dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="fa_icon form_close"></i>
                            </button>
                            <div className="modal-body">
                                <div className="ms_register_img">
                                    <img src="assets/images/register_img.png" alt="" className="img-fluid" />
                                </div>
                                <div className="ms_register_form">
                                    <h2>Register / Sign Up</h2>
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Your Name" className="form-control" />
                                        <span className="form_icon">
                                            <i className="fa_icon form-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Your Email" className="form-control" />
                                        <span className="form_icon">
                                            <i className="fa_icon form-envelope" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Enter Password" className="form-control" />
                                        <span className="form_icon">
                                            <i className="fa_icon form-lock" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Confirm Password" className="form-control" />
                                        <span className="form_icon">
                                            <i className=" fa_icon form-lock" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <a href="#" className="ms_btn">register now</a>
                                    <p>Already Have An Account? <a href="#myModal1" data-toggle="modal" className="ms_modal hideCurrentModel">login here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="myModal1" className="modal  centered-modal" role="dialog">
                    <div className="modal-dialog login_dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">
                                <i className="fa_icon form_close"></i>
                            </button>
                            <div className="modal-body">
                                <div className="ms_register_img">
                                    <img src="assets/images/register_img.png" alt="" className="img-fluid" />
                                </div>
                                <div className="ms_register_form">
                                    <h2>login / Sign in</h2>
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Your Email" className="form-control" />
                                        <span className="form_icon">
                                            <i className="fa_icon form-envelope" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Enter Password" className="form-control" />
                                        <span className="form_icon">
                                            <i className="fa_icon form-lock" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="remember_checkbox">
                                        <label>Keep me signed in
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <a href="profile.html" className="ms_btn" target="_blank">login now</a>
                                    <div className="popup_forgot">
                                        <a href="#">Forgot Password ?</a>
                                    </div>
                                    <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modals