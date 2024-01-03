import React from "react";

const TableLoader = () => (
  <tr>
    <td colSpan="4" className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </td>
  </tr>
);

const ImageLoader = () => (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

export { TableLoader, ImageLoader };
