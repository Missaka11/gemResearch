// @ts-nocheck

import React, {useState} from 'react';
import './App.css';
import {Footer} from "./components/Footer";
import {Header} from "./Header";
import {Upload} from "./Upload";
import {Report} from "./Report";
import {Preview} from "./Preview";
import {Processing} from "./Processing";
import {Home} from "./Home";
import {HomeOther} from "./HomeOther";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

  const path = window.location.pathname.substring(1);
  const [link, setLink] = useState(path);
  const [image, setImage] = useState("");
  const [type, setType] = useState("");

  const setPath = ({path=""}) => {
    window.history.pushState({}, '', path);
    setLink(path);
  }

  const onImage = ({image=""}) => {
    setImage(image);
    setPath({path:"upload"});
  }
  const onType = (type) => {
      alert(type);
      setType(type);
      setPath({path: "report"});
  }

  return (
    <div className="container-fluid m-0 p-0">

        <Header />

        {(link === "" || link === "home") && <Home auth={link === "home"} setPath={setPath} />}
        {link === "preview" && <Preview onImage={onImage} />}
        {link === "upload" && <Upload onType={onType} image={image} />}
        {link === "report" && <Report setPath={setPath} image={image} type={type}/>}
        {link === "process" && <Processing setPath={setPath} />}

        {link === "" && <HomeOther/>}
        <Footer />

  </div>

  );
}

export default App;
