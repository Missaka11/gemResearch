import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";

export const Upload = ({ image = "", onType = () => {} }) => {
  const upload = async () => {
    let url = "http://127.0.0.1:5001/api/identify";
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });
      let json = await response.json();
      // alert(JSON.stringify(json));
      let type = json.type;
      if (type === "Unidentified") {
        alert("Unable to Identify the image");
        window.location.assign("/");
      } else if (type === "non_gem") {
        alert("Provided image is not a gem");
        window.location.assign("/");
      } else {
        onType(json.class);
      }
    } catch (e) {
      alert("Unable to upload the image!");
      window.location.assign("/");
    }
    // setPath({path: "process"});
  };
  return (
    <>
      <Header />
      <div
        className="w-100 p-0 m-0 mb-5"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "500px", height: "500px" }}
          src={image === null || image.length === 0 ? "img/gem.png" : image}
          alt="Gem"
        />
        <button
          onClick={upload}
          style={{
            width: "fit-content",
            backgroundColor: "Blue",
            fontSize: "19px",
            fontWeight: "bolder",
            border: 0,
          }}
          className="btn btn-info rounded rounded-5 mt-5 py-2 px-5 text-white"
        >
          Upload the Image
        </button>
      </div>
      <FooterComp />
    </>
  );
};

export default Upload;
