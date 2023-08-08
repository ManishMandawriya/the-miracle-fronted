import React from 'react'

const Register = () => {


    return (
        <>
            <div className="modal-dialog register_dialog">
                <div className="modal-content">
                    {/* <button type="button" className="close" data-dismiss="modal">
                        <i className="fa_icon form_close"></i>
                    </button> */}
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
                            {/* <p>Already Have An Account? <a data-toggle="modal" className="ms_modal hideCurrentModel" style={{ cursor: "pointer" }} >login here</a></p> */}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Register