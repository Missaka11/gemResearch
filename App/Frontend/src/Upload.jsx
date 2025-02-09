import React from "react";

export const Upload = ({
    image = "", onType = () => {
    }
}) => {

    const upload = async () => {
        let url = "http://127.0.0.1:4000/api/identify";

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image }),
            });

            let json = await response.json();
            alert(JSON.stringify(json));
            let type = (json).type;

            if (type === "Unidentified" || type === "non_gem"){
                alert("Gem not detected in the image!");
            }else {
                 url = "http://127.0.0.1:5000/upload";
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({image}),
                });
               let json = await response.json();
                alert(JSON.stringify(json));
                type = json.message.pred_label
            }
            onType(type);
        } catch (e) {
            alert("Unable to upload the image!");
            onType("Unidentified");
        }

        // setPath({path: "process"});
    }

    return (
        <div className="w-100 p-0 m-0 mb-5" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ width: '80%', height: 'auto', maxHeight: '80vh', }}
                src={(image === null || image.length === 0) ? "img/gem.png" : image} alt="Gem" />
            <button
                onClick={upload}
                style={{
                    width: 'fit-content',
                    backgroundColor: '#1C60C7',
                    fontSize: '19px',
                    fontWeight: 'bolder',
                    border: 0,
                }}
                className="btn btn-info rounded rounded-5 mt-5 py-2 px-5 text-white"
            >
                Upload the Image
                <i className="fa fa-arrow-right ms-3 text-dark bg-white rounded rounded-circle p-1"></i>
            </button>
        </div>
    );
};