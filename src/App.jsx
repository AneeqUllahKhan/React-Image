import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import ImageComponent from "./components/ImageComponent";
import EffectImage from "./components/EffectImage";

function App() {
  
  return (
    <>
      <div>
        <div className="container mt-5 mb-5">
          <h3 className="text-center fw-bolder">Own Image API Fetch</h3>
        </div>
        <ImageComponent/>
        {/* <EffectImage/> */}
      </div>
    </>
  );
}

export default App;
