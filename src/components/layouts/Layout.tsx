'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AudioPlayer from '../player/AudioPlayer'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ToggleLoginRegisterAction } from '@/redux/actions/CustomAction'
import DefalutToast from './DefaultToast'
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
    children: ReactNode
}

// const [isAuthenticated, setIsAuthenticated]: any = useState(false)

// useEffect(() => {
//     if (typeof window !== 'undefined') {
//         const isUserLoginToken = localStorage.getItem("isUserLoginToken");
//         if (isUserLoginToken) {
//             setIsAuthenticated(true)
//         } else {
//             isAuthenticated(false)
//         }
//     }
// }, [])

export default function ({ children }: LayoutProps) {

    return (
        <React.Fragment>
            <div className="ms_main_wrapper">
                <div className="ms_content_wrapper padder_top80">
                    <Header />
                    {children}
                </div>
                <Sidebar />
                <Footer />

                <AudioPlayer />
            </div>


            <div className="ms_register_popup">
                <div id="myModal" className="modal  centered-modal" role="dialog">
                    <Register />
                </div>

                <div id="myModal1" className="modal  centered-modal" role="dialog">
                    <Login />
                </div>

            </div>

            <DefalutToast />
        </React.Fragment>
    )
}

