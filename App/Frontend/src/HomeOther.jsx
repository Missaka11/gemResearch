import React, {useEffect, useState} from "react";

function Card({head="", foot="", title="", text="", link = ""}) {

    return <div className="col-4 px-3">
        <div className="card" style={{border: "3px solid black", borderRadius: "16px"}}>
            <div className="card-body text-start">
                <div className="p-3">
                    <img className="text-start" src={head}
                         style={{width: "24px", height: "24px"}}/>
                    <div style={{fontSize: "28px", fontWeight: "bolder", paddingTop: "20px"}}>{title}</div>
                    <div style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        paddingTop: "20px",
                        paddingBottom: "40px"
                    }}>{text}</div>
                    <button
                        onClick={()=> window.location.assign(link)}
                        className="btn" style={{fontSize: "14px", fontWeight: "bolder"}}>
                        SEE MORE <i className="fa fa-arrow-right ps-2"></i>
                    </button>
                </div>
            </div>
            <img className="text-start" src={foot} style={{width: "100%", height: "auto"}}/>

        </div>
    </div>;
}

function Slideshow() {

    const [active, setActive] = useState(1);

    useEffect(() => {
        const slideshow = () => {
            let x = () => {
                setTimeout(() => {
                    setActive((active % 8) + 1);
                }, 1200);
            }
            x();
        }

        slideshow();

    });


    return <>
        <img style={{width: "auto", height: "400px"}} className="pt-3" src={"img/slide/" + active + ".jpg"} alt="Home Image 2"/>

        <div className="w-100 d-flex justify-content-between mt-3 p-3">

            <div>
                {Array(8).fill(1).map((_, i) => {
                    return <button
                        style={{fontSize: "24px"}}
                        onClick={()=> setActive(i + 1)}
                        className={"btn mx-2 rounded rounded-circle px-3" + ((i + 1) === active ? " text-dark border border-1 border-dark " : " btn-dark text-light ")}>
                        0{i + 1}
                    </button>
                })}

            </div>

            <div>
                <button
                    onClick={()=> setActive((((active + 6) % 8) + 1))}
                    style={{fontSize: "24px"}} className="btn btn-dark mx-2 rounded rounded-circle">
                    <i className="fa fa-arrow-left"></i>
                </button>
                <button
                    onClick={()=> setActive((active % 8) + 1)}
                    style={{fontSize: "24px"}} className="btn btn-dark mx-2 rounded rounded-circle">
                    <i className="fa fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </>;
}

export const HomeOther = ({}) => {
    return (
        <>
            <div className="w-100 pt-5 m-0 text-center" style={{position: 'relative', display: 'inline-block'}}>
                <div style={{color: '#D1D5DB', fontSize: '64px'}}>
                    Join our growing network
                    <i className="ms-2 fa fa-arrow-down"></i>
                </div>

                <div className="px-5 pt-3 h-auto">
                    <div className="row px-5 mx-5">
                        <Card head="img/card/1.png" foot="img/card/4.png" title="Gem Identification"
                              text="Are you a restaurant owner looking to grow your business? Reach new customers when you join our network."
                              link="/home"/>
                        <Card head="img/card/2.png" foot="img/card/5.png" title="Gem Classification"
                              text="Join our elite league of delivery riders delivering happiness to customers and earn to achieve your dreams while at it."
                              link="/home"/>
                        <Card head="img/card/3.png" foot="img/card/6.png" title="Jewelry Design"
                              text="If you are passionate about helping us achieve our goal to deliver meals seamlessly, come join the team."
                              link="/home"/>
                    </div>
                </div>

            </div>

            <div className="w-100 pt-5 m-0 text-center" style={{position: 'relative', display: 'inline-block'}}>

                <div className="row px-5 mx-5 py-5 my-5">
                    <div className="col-6"><img style={{width: '100%', height: 'auto'}} className="pt-3" src="img/home-4.png"/></div>
                    <div className="col-6 d-flex justify-content-center flex-column">
                        <div style={{fontSize: '60px', fontWeight: 'bolder'}}>Design Your<br/>Own jewelry</div>
                        <div className="py-5" style={{fontSize: '20px', fontWeight: 'normal'}}>
                            Whether you want to edit your Google Docs, resolve Jira issues, or collaborate over Zoom,
                            Miro has 100+ integrations with tools you already use and love.
                        </div>
                        <button
                            onClick={() => window.location.assign("#")}
                            className="btn" style={{fontSize: "14px", fontWeight: "bolder"}}>
                            Learn more <i className="fa fa-arrow-right ps-2"></i>
                        </button>
                    </div>
                </div>


            </div>

            <div className="py-5"></div>
            <div className="w-100 pt-5 m-0 text-center"
                 style={{position: 'relative', display: 'inline-block', backgroundColor: '#1C60C7'}}>
                <div className="card border boarder-0"
                     style={{
                         marginLeft: "7%", marginRight: "7%", backgroundColor: '#FFC501',
                         borderRadius: "16px", position: 'relative', top: '-150px', left: '0', right: '0'
                     }}>
                    <div className="card-body pb-3">
                        <div className="w-100 text-center fw-bolder" style={{fontSize: '72px'}}>Explore categories</div>
                        <Slideshow/>
                    </div>
                </div>


                <div className="row pb-5 mb-5 px-3">
                    <div className="col-3"><img style={{width: '100%', height: 'auto'}} className=""
                                                src="img/bar/1.png"/></div>
                    <div className="col-3"><img style={{width: '100%', height: 'auto'}} className=" pt-5"
                                                src="img/bar/2.png"/></div>
                    <div className="col-3"><img style={{width: '100%', height: 'auto'}} className=""
                                                src="img/bar/3.png"/></div>
                    <div className="col-3"><img style={{width: '100%', height: 'auto'}} className=" pt-5"
                                                src="img/bar/4.png"/></div>
                </div>


            </div>
        </>
    );
}