import React, { useState, useEffect } from "react";
import axios from "axios";

const EffectImage = () => {
  const [imagesData, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://stormy-wig-cod.cyclic.app/api/v1/getImages"
        );
        setImages(response.data.imageUrls || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {imagesData.map((imageUrl, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`https://stormy-wig-cod.cyclic.app${imageUrl}`}
                      alt={`Image ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                      loading="lazy"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EffectImage;
