import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "../protectedRoute/publicRoute";
import Cookies from 'js-cookie';
import Signup from "../pages/signup";
import Login from "../pages/login";
import UserRoutes from "./userRoutes";
import NotFound from "../common/notfound";
import setAuthToken from "../utils/setAuthToken";

if (Cookies.get('assessment_token')) {
    setAuthToken(Cookies.get('assessment_token'));
};

const AppRoutes = () => {

    useEffect(() => {
        if (Cookies.get('assessment_route') && window.location.pathname === '/') {
            if (Cookies.get('assessment_token')) {
                window.location.href = `${`/${Cookies.get('assessment_route')}/home`}`;
            } else {
                window.location.href = `${`/${Cookies.get('assessment_route')}/`}`;
            };
        };
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/*" element={<PublicRoute><NotFound /></PublicRoute>} />
                <Route path={Cookies.get('assessment_route') ? `/${Cookies.get('assessment_route')}/*` : '/404'} element={<UserRoutes />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
