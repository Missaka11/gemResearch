import React, {useEffect, useRef, useState} from "react";

export const Preview = ({onImage = ({}) => {} }) => {

    const videoRef = useRef (null);
    const [devices, setDevices] = useState([]);
    const [device, setDevice] = useState(null);

    useEffect(() => {
        const startCamera = async () => {

            // Enumerate devices to get a list of all media devices
            navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                    // Filter video devices
                    const videoDevices = devices.filter(device => device.kind === 'videoinput');
                    const devices_ = [];
                    for (let d of videoDevices) {
                        devices_.push({
                            id: d.deviceId,
                            label: d.label,
                            group: d.groupId
                        });
                    }
                    console.log(devices_);
                    // @ts-ignore
                    setDevices(devices_);
                })
                .catch(function (error) {
                    console.error('Error enumerating devices: ', error);
                });
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (videoRef.current && context) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            const base64Image = canvas.toDataURL('image/png');

            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }

            onImage({image: base64Image});
        }
    };

    if (devices != null && devices.length > 0) {
        let id = device == null ? devices[0].id : device;
        navigator.mediaDevices.getUserMedia({video: {deviceId: id}})
            .then(function (stream) {
                // Use the stream
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(function (error) {
                console.error('Error accessing the camera: ', error);
                alert('Unable to access your camera');
            });
    }

    return (
        <div className="w-100 p-0 m-0" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div className='my-2 fs-3 fw-bold'>Camera Live preview</div>
            <select onChange={(e) => setDevice(e.target.value)} className="form-select w-50 text-center my-3">
                {devices.map((device) => {
                    return <option value={device.id}>{device.label}</option>
                })}
            </select>
            <video
                ref={videoRef}
                style={{width: '80%', height: 'auto', maxHeight: '80vh'}}
                autoPlay
            />

            <button
                onClick={() => {
                    captureImage();
                }}
                style={{
                    width: 'fit-content',
                    backgroundColor: '#1C60C7',
                    fontSize: '19px',
                    fontWeight: 'bolder',
                    border: 0,
                }}
                className="btn btn-info rounded rounded-5 my-5 py-2 px-5 text-white"
            >
                Capture the Image
                <i className="fa fa-camera ms-3 text-dark bg-white rounded rounded-circle p-1"></i>
            </button>

        </div>
    );
};