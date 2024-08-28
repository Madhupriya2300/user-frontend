import React from "react";
import { useSelector } from "react-redux";

export default function PageLoader() {

    const { pageLoader } = useSelector(state => state.commonReducer);

    return (
        <>
            {pageLoader &&
               <h3>Loading...</h3>
            }
        </>
    )
}