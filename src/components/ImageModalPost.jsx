import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageModalPost = ({ selectedImage, closeModal }) => {
  return (
    <div className="modal fade" id="imageModalPost" tabIndex="-1" aria-labelledby="imageModalPostLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="imageModalPostLabel">Post Image</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            {selectedImage && (
              <img
                src={`https://stormy-wig-cod.cyclic.app${selectedImage.postImagePath}`}
                alt={`Post Image ${selectedImage.id}`}
                style={{ width: "100%" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModalPost;
