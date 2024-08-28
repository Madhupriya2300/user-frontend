import React from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function Searchbar({ placeholder, handleSearch }) {

    return (
        <div className="searchbar_main_div">
            <PiMagnifyingGlass className="searchbar_icon" />
            <input
                type="search"
                className="form-control searchbar_input"
                placeholder={placeholder}
                onChange={handleSearch}
            />
        </div>
    )
}