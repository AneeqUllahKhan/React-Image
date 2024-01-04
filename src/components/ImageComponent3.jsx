import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableLoader, ImageLoader } from "./Loader";
import Pagination from "./Pagination";
import ImageModalPre from "./ImageModalPre";
import ImageModalPost from "./ImageModalPost";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageComponent3 = () => {
  const [images, setImages] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://stormy-wig-cod.cyclic.app/api/v1/getPostImage"
        );

        const newImages = response.data || [];
        setImages(newImages);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoadingTable(false);
      }
    };

    fetchImages();

    const intervalId = setInterval(fetchImages, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const openImageModalPre = (image) => {
    setSelectedImage(image);
    const modal = new bootstrap.Modal(
      document.getElementById("imageModalPre"),
      {}
    );
    modal.show();
  };

  const openImageModalPost = (image) => {
    setSelectedImage(image);
    const modal = new bootstrap.Modal(
      document.getElementById("imageModalPost"),
      {}
    );
    modal.show();
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className="container mt-3">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image Created At</th>
            <th>Image Updated At</th>
            <th>Pre Image</th>
            <th>Post Image</th>
          </tr>
        </thead>
        <tbody>
          {loadingTable ? (
            <TableLoader />
          ) : (
            currentImages.map((image) => (
              <tr key={image.id}>
                <td>{image.id}</td>
                <td>{image.createdAt}</td>
                <td>{image.updatedAt}</td>
                <td>
                  <img
                    src={`https://stormy-wig-cod.cyclic.app${image.preImagePath}`}
                    alt={`Pre Image ${image.id}`}
                    style={{
                      width: "200px",
                      height: "180px",
                      cursor: "pointer",
                    }}
                    onClick={() => openImageModalPre(image)}
                  />
                </td>
                <td>
                  <img
                    src={`https://stormy-wig-cod.cyclic.app${image.postImagePath}`}
                    alt={`Post Image ${image.id}`}
                    style={{
                      width: "200px",
                      height: "180px",
                      cursor: "pointer",
                    }}
                    onClick={() => openImageModalPost(image)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(images.length / imagesPerPage)}
        onPageChange={setCurrentPage}
      />

      <ImageModalPre selectedImage={selectedImage} closeModal={closeImageModal} />
      <ImageModalPost selectedImage={selectedImage} closeModal={closeImageModal} />
    </div>
  );
};

export default ImageComponent3;
