import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastMessage() {

    const { pathname } = useLocation();

    const { alert } = useSelector(state => state.commonReducer);

    useEffect(() => {
        if (alert?.show === true) {
            if (alert?.status === 'success') {
                toast.success(alert?.message, {
                    toastId: "success1"
                });
            } else if (alert?.status === 'failed') {
                toast.error(alert?.message);
            };
        };
    }, [alert, pathname]);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                theme="light"
            />
        </>
    )
};