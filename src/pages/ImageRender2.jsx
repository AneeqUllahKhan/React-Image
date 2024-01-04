import React from "react";
import Navbar from "../components/Navbar";
import ImageComponent2 from "../components/ImageComponent2";

const ImageRender2 = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="container mt-5 mb-5">
          <h3 className="text-center fw-bolder">Own Pre Post Image API Fetch Created With Node, Express and MYSQL</h3>
        </div>
        <ImageComponent2 />
      </div>
    </div>
  );
};

export default ImageRender2;
