import React from "react";

export const Report = ({
                           image = "", setPath = ({}) => {
    }, type = ""
                       }) => {

    return (
        <div className="w-100 p-0 m-0 mb-5 text-center"
             style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <img style={{width: '80%', height: 'auto', maxHeight: '80vh',}}
                 src={(image === null || image.length === 0) ? "img/gem.png" : image} alt="Gem"/>

            <div className="pt-2" style={{fontSize: '60px', fontWeight: 'bolder'}}>
                {type}
            </div>
            <div className="pt-5" style={{fontSize: '18px', fontWeight: 'normal'}}>
                Whether you want to edit your Google Docs, resolve Jira issues, or collaborate over Zoom, Miro has 100+
                integrations with tools you already use and love.
            </div>
            <button
                onClick={() => {
                    let link = document.createElement('a');
                    link.href = `/pdf/${type}.pdf`;
                    link.download = type + ".pdf";
                    link.click();
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
                Download the Report
                <i className="fa fa-arrow-down ms-3 text-dark bg-white rounded rounded-circle p-1"></i>
            </button>
        </div>
    );
};