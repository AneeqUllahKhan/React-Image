import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableLoader, ImageLoader } from "../components/Loader";

const ImageComponent = () => {
  const [images, setImages] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://stormy-wig-cod.cyclic.app/api/v1/mysql/getImages"
        );
        console.log("API Response:", response.data);
        setImages(response.data.imageUrls);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoadingTable(false);
      }
    };

    fetchImages();

    // Polling every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchImages, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleImageLoad = (index) => {
    // Set loading to false for the specific image index
    const updatedImages = [...images];
    updatedImages[index].loading = false;
    setImages(updatedImages);
  };

  return (
    <div className="container mt-3">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image Created At</th>
            <th>Image Updated At</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {loadingTable ? (
            // Use the TableLoader component
            <TableLoader />
          ) : (
            // Render each image in a row
            images.map((image, index) => (
              <tr key={image.id}>
                <td>{image.id}</td>
                <td>{image.createdAt}</td>
                <td>{image.updatedAt}</td>
                <td>
                  {image.loading ? (
                    // Use the ImageLoader component
                    <ImageLoader />
                  ) : (
                    // Render the image
                    <img
                      key={image.id}
                      src={`https://stormy-wig-cod.cyclic.app${image.path}`}
                      alt={`Image ${image.id}`}
                      style={{ width: "150px", height: "150px" }}
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)} // Set loading to false for the specific image index
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(ImageComponent);
