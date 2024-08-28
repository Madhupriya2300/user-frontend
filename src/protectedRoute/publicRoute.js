import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function PublicRoute(props) {

    return (
        <>
            {
                    (Cookies.get('assessment_token')) ? (
                        <Navigate to={`/${Cookies.get('assessment_route')}/home`} />
                    )
                        :
                        (
                            props.children
                        )
            }
        </>
    )
};