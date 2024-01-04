import React from "react";
import ImageComponent from "../components/ImageComponent";
import Navbar from "../components/Navbar"

const ImageRender1 = () => {
  return (
    <>
    <Navbar />
      <div>
        <div className="container mt-5 mb-5">
          <h3 className="text-center fw-bolder">Own Image API Fetch Created With Node, Express and MYSQL</h3>
        </div>
        <ImageComponent />
        {/* <EffectImage/> */}
      </div>
    </>
  );
};

export default ImageRender1;
