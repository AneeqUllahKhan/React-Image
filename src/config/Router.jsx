import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageRender1 from "../pages/imageRender1";
import ImageRender2 from "../pages/imageRender2";
import ImageRender3 from "../pages/ImageRender3";


export default function ReactRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageRender1 />} />
        <Route path="/image2" element={<ImageRender2 />} />
        <Route path="/image3" element={<ImageRender3 />}/>
      </Routes>
    </Router>
  );
}