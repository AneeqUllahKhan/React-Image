import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableLoader, ImageLoader } from "./Loader";
import Pagination from "./Pagination";
import ImageModal from "./ImageModal";
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageComponent = () => {
  const [images, setImages] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://stormy-wig-cod.cyclic.app/api/v1/mysql/getImages"
        );

        const newImages = response.data?.imageUrls || [];
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

  const handleImageLoad = (index) => {
    const updatedImages = [...images];
    updatedImages[index].loading = false;
    setImages(updatedImages);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openImageModal = (image) => {
    setSelectedImage(image);
    const modal = new bootstrap.Modal(document.getElementById('imageModal'), {});
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
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {loadingTable ? (
            <TableLoader />
          ) : (
            currentImages.map((image, index) => (
              <tr key={image.id}>
                <td>{image.id}</td>
                <td>{image.createdAt}</td>
                <td>{image.updatedAt}</td>
                <td>
                  {image.loading ? (
                    <ImageLoader />
                  ) : (
                    <img
                      key={image.id}
                      src={`https://stormy-wig-cod.cyclic.app${image.path}`}
                      alt={`Image ${image.id}`}
                      style={{ width: "200px", height: "180px", cursor: "pointer" }}
                      loading="lazy"
                      onClick={() => openImageModal(image)}
                      onLoad={() => handleImageLoad(index)}
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(images.length / imagesPerPage)}
        onPageChange={paginate}
      />

      <ImageModal selectedImage={selectedImage} closeModal={closeImageModal} />
    </div>
  );
};

export default React.memo(ImageComponent);
