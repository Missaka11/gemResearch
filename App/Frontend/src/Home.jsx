import React from "react";


export const Home = ({auth = false, setPath = ({}) => {}}) => {

    return (
        <div className="w-100 p-0 m-0" style={{position: 'relative', display: 'inline-block'}}>
            <img style={{width: '100%', height: 'auto'}} src="img//bg-1.png" alt="Background 1"/>
            <div style={{position: 'absolute', width: '100%', top: 0, left: 0, height: '100%'}}>
                <div className="row m-0 p-5" style={{height: '100%'}}>
                    <div className="col-1"></div>
                    <div className="col-4 py-5 my-5 d-flex justify-content-between flex-column">
                        <div style={{fontSize: '60px', fontWeight: 'bolder'}}>Value Your<br/>Gem !</div>
                        <div style={{fontSize: '20px', fontWeight: 'normal'}}>
                            Curious about the authenticity of your gemstone? Our advanced tool helps you capture,
                            analyze, and verify your gem’s unique features with precision. Start your gem identification
                            journey now.
                        </div>

                        <button
                            onClick={() => {
                                if (auth) setPath({path: "preview"});
                                else setPath({path: "home"});
                            }}
                            style={{
                                width: 'fit-content',
                                backgroundColor: '#1C60C7',
                                fontSize: '19px',
                                fontWeight: 'bolder',
                                border: 0,
                            }}
                            className="btn btn-info rounded rounded-5 mt-5 py-2 px-5 text-white"
                        >
                            {auth ? "Capture the Image" : "Sign in for free"}
                            <i className="fa fa-arrow-right ms-3 text-dark bg-white rounded rounded-circle p-1"></i>
                        </button>

                    </div>
                    <div className="col-1"></div>
                    <div className="col-6"
                         style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <img
                            src={auth ? "img//human-2.png" : "img//human-1.png"}
                            style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                            alt="Human Image"
                        />
                    </div>
                </div>
            </div>
            {auth && <div className='py-5'></div>}
        </div>

    );
}