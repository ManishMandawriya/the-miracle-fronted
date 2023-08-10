import useMakeRequest from '@/utils/apiHelper';
import { saveToStorage } from '@/utils/helper';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {

  const { loading, data, error, makeRequest }: any = useMakeRequest();
  const [loginDetails, setLoginDetails]: any = useState({
    email: "",
    password: "",
    remember_me: false
  })
  const [errorMsg, setErrorMsg]: any = useState('')


  const onSubmit = async () => {
    if (loginDetails) {
      await makeRequest(loginDetails, "users/login", "post")
    }
  }

  useEffect(() => {
    if (error) {
      setErrorMsg(error?.response?.data?.message)
    } else if (data) {
      toast.success(data?.message)
      saveToStorage("isUserLoginToken", data?.access_token)
      if (typeof window !== 'undefined') {
        setTimeout(()=>{
          window.location.reload()
        },2500)
      }
    }
  }, [data, error])
  return (
    <>
      <div className="modal-dialog login_dialog">
        <div className="modal-content">
          {/* <button type="button" className="close" data-dismiss="modal">
            <i className="fa_icon form_close"></i>
          </button> */}
          <div className="modal-body">
            <div className="ms_register_img">
              <img src="assets/images/register_img.png" alt="" className="img-fluid" />
            </div>
            <div className="ms_register_form">
              <form >
                <h2>login / Sign in</h2>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="form-control"
                    onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                  />
                  <span className="form_icon">
                    <i className="fa_icon form-envelope" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                  />
                  <span className="form_icon">
                    <i className="fa_icon form-lock" aria-hidden="true"></i>
                  </span>
                </div>
                {errorMsg && <p style={{ color: "red", backgroundColor: "white" }}>{errorMsg}</p>}
                <div className="remember_checkbox">
                  <label>Keep me signed in
                    <input type="checkbox" onChange={(e) => setLoginDetails({ ...loginDetails, remember_me: e.target.checked })} />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <a style={{ cursor: "pointer" }} className="ms_btn" onClick={onSubmit}>login now</a>
                <div className="popup_forgot">
                  <a href="#">Forgot Password ?</a>
                </div>
                {/* <p>Don't Have An Account? <a style={{cursor:"pointer"}} data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p> */}
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login