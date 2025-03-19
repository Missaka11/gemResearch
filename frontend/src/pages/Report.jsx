import React from "react";
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";

export const Report = ({ image = "", setPath = ({}) => {}, type = "" }) => {
  return (
    <>
      <Header />
      <div
        className="w-100 p-0 m-0 mb-5 text-center"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "60%", height: "500px" }}
          src={image === null || image.length === 0 ? "img/gem.png" : image}
          alt="Gem"
        />

        <div
          className="pt-2"
          style={{ fontSize: "60px", fontWeight: "bolder" }}
        >
          {type}
        </div>
        <div
          className="pt-5"
          style={{ fontSize: "18px", fontWeight: "normal" }}
        ></div>
        <button
          onClick={() => {
            let link = document.createElement("a");
            link.href = `/pdf/${type}.pdf`;
            link.download = type + ".pdf";
            link.click();
          }}
          style={{
            width: "fit-content",
            backgroundColor: "Blue",
            fontSize: "19px",
            fontWeight: "bolder",
            border: 0,
          }}
          className="btn btn-info rounded rounded-5 mt-5 py-2 px-5 text-white"
        >
          Download the Report
        </button>
      </div>
      <FooterComp />
    </>
  );
};

export default Report;
