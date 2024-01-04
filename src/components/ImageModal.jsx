import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageModal = ({ selectedImage, closeModal }) => {
  return (
    <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="imageModalLabel">Image</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            {selectedImage && (
              <img
                src={`https://stormy-wig-cod.cyclic.app${selectedImage.path}`}
                alt={`Image ${selectedImage.id}`}
                style={{ width: "100%" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
