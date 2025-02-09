import React from "react";

export const Footer = ({}) => {
    return (
        <div className="w-100 p-0 px-5 m-0 bg-black">
            <div
                style={{
                    borderBottom: 'rgba(255, 255, 255, 0.125) 2px solid',
                    borderTop: 'rgba(255, 255, 255, 0.125) 2px solid',
                }}
                className="w-100 mt-4 py-3 d-inline-flex justify-content-between align-items-center"
            >
                <div style={{color: '#d1d5db70', fontSize: '20px'}}>gemora.gem@gmail.com</div>
                <i style={{color: '#8C77EC', fontSize: '20px'}} className="ms-2 fa fa-arrow-right"></i>
            </div>

            <div className="row d-flex align-items-center pb-3"
                 style={{paddingTop: '64px', borderBottom: 'rgba(255, 255, 255, 0.125) 2px solid'}}>
                <div className="col-3">
                    <div style={{
                        padding: '16px 0',
                        fontSize: '14px',
                        fontWeight: 'bolder',
                        color: 'rgba(255, 255, 255, 0.4)',
                        letterSpacing: '3px'
                    }}>Company
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>About
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>FAQs
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Contact
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Privacy Policy
                    </div>
                </div>

                <div className="col-3">
                    <div style={{
                        padding: '16px 0',
                        fontSize: '14px',
                        fontWeight: 'bolder',
                        color: 'rgba(255, 255, 255, 0.4)',
                        letterSpacing: '3px'
                    }}>Get help
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Gem Identification
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Gem Classification
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Jewelry Design
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Design Your Own Jewelry
                    </div>
                </div>

                <div className="col-3">
                    <div style={{
                        padding: '16px 0',
                        fontSize: '14px',
                        fontWeight: 'bolder',
                        color: 'rgba(255, 255, 255, 0.4)',
                        letterSpacing: '3px'
                    }}>Follow Us
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Facebook
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Instagram
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>LinkedIn
                    </div>
                    <div style={{
                        padding: '16px 0',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: 'rgba(255, 255, 255, 1)'
                    }}>Twitter
                    </div>
                </div>

                <div className="col-3">
                    <img className="p-2" src="img//logo.png" width="100%" alt="Footer Logo"/>
                </div>
            </div>

            <div className="w-100 text-center pt-4 pb-2" style={{color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px'}}>
                © 2024 Gemora Capture. All rights reserved.
            </div>
        </div>

    );
}