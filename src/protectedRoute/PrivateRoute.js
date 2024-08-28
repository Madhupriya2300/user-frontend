import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function PrivateRoute(props) {

    return (
        <>
            {(Cookies.get('assessment_token')) ?
                props.children
                :
                <Navigate to={`/${Cookies.get('assessment_route')}/`} />
            }
        </>
    )
};