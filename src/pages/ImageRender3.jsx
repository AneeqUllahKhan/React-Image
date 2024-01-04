import React from "react";
import ImageComponent3 from "../components/ImageComponent3";
import Navbar from "../components/Navbar";

const ImageRender3 = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        <h3 className="text-center fw-bolder">
          Own Pre Post Image API Fetch Created With Node, Express and MYSQL
        </h3>
        <ImageComponent3 />
      </div>
    </div>
  );
};

export default ImageRender3;
