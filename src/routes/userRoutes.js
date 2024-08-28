import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../protectedRoute/PrivateRoute";
import Home from "../pages/home";

const UserRoutes = () => {

    return (
        <>
            <Routes>
                <Route path="home" element={<PrivateRoute><Home /></PrivateRoute>} />
            </Routes>
        </>
    )

};

export default UserRoutes;