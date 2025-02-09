import React from "react";

export const Header = ({}) => {
    return (
        <div className="row d-flex align-items-center mx-5">
            <div className="col-2">
                <img src="img//header_logo.png" width="100px" height="100px" alt="Header Logo"/>
            </div>
            <div className="col-8 d-flex justify-content-center">
                <div className="px-5">Home</div>
                <div className="px-5">About Us</div>
                <div className="px-5">Contact</div>
                <div className="px-5">Services</div>
            </div>
            <div className="col-2" style={{textAlign: 'right'}}>
                <button
                    style={{backgroundColor: '#1C60C7'}}
                    className="btn btn-info rounded rounded-5 p-2 px-4 text-white"
                >
                    Sign In
                </button>
            </div>
        </div>

    );
}