'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const DefaultToast = (props: any) => {

    return (
        <ToastContainer
            position="top-center"
            autoClose={props?.timeOut ? props?.timeOut : 2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    )
}

export default DefaultToast