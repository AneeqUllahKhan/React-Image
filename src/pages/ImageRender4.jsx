import React from "react";
import Navbar from "../components/Navbar";
import ImageComponent4 from "../components/ImageComponent4";

const ImageRender4 = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="container-fluid mt-5 mb-5">
          <div class="alert alert-primary" role="alert">
            <h3 className="text-center fw-bolder">
              Own Pre Post Image API Fetch Created With Node, Express and MYSQL
            </h3>
          </div>
          <ImageComponent4 />
        </div>
      </div>
    </>
  );
};

export default ImageRender4;
