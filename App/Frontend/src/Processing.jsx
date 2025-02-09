import React, {useState} from "react";

export const Processing = ({
                               setPath = ({}) => {
                               }
                           }) => {

    const [count, setCount] = useState(0);

    const process = () => {
        let x = () => {
            setTimeout(() => {
                if (count === 5) {
                    setPath({path: "report"});
                } else {
                    x();
                }
                setCount(count + 1);
            }, 500);
        }
        x();
    }

    process();


    return (
        <div className="w-100 p-0 m-0" style={{position: 'relative', display: 'inline-block'}}>
            <img
                style={{width: '100%', height: 'auto', visibility: 'hidden'}}
                src="img/bg-1.png"
                alt="Background"
            />
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: 0,
                    left: 0,
                    height: '100%',
                }}
                className="d-flex align-items-center justify-content-center"
            >
                <div style={{fontSize: '36px', fontWeight: 'bold', color: 'black'}}>
                    {"Processing " + ".".repeat(count)}
                </div>
            </div>
        </div>
    );
};