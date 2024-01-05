import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import ImageModalPre from "./ImageModalPre";
import ImageModalPost from "./ImageModalPost";
import { PaginationItem } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ImageComponent4 = () => {
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

  const getImageExtension = (path) => {
    const parts = path.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Pre Folder Path</StyledTableCell>
              <StyledTableCell>Post Folder Path</StyledTableCell>
              <StyledTableCell>File Extension</StyledTableCell>
              <StyledTableCell>API Link</StyledTableCell>
              <StyledTableCell>Image Created At</StyledTableCell>
              <StyledTableCell>Image Updated At</StyledTableCell>
              <StyledTableCell>Pre Image</StyledTableCell>
              <StyledTableCell>Post Image</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingTable ? (
              <TableRow>
                <StyledTableCell colSpan={5} align="center">
                  <CircularProgress />
                </StyledTableCell>
              </TableRow>
            ) : (
              currentImages.map((image) => (
                <StyledTableRow key={image.id}>
                  <StyledTableCell>{image.id}</StyledTableCell>
                  <StyledTableCell>{image.preImagePath}</StyledTableCell>
                  <StyledTableCell>{image.postImagePath}</StyledTableCell>
                  <StyledTableCell>{getImageExtension(image.preImagePath)}</StyledTableCell>
                  <StyledTableCell>https://stormy-wig-cod.cyclic.app/</StyledTableCell>
                  <StyledTableCell>{image.createdAt}</StyledTableCell>
                  <StyledTableCell>{image.updatedAt}</StyledTableCell>
                  <StyledTableCell>
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
                  </StyledTableCell>
                  <StyledTableCell>
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
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(images.length / imagesPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        style={{ marginTop: "12px" }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              color: 'white', 
              backgroundColor: 'black',
              '&.Mui-selected': {
                color: 'black', // Change this to your desired color for the selected page
              },
              '&:hover': {
                backgroundColor: 'gray', // Change this to your desired hover background color
              },
            }}
          />
        )}
      />

      <ImageModalPre
        selectedImage={selectedImage}
        closeModal={closeImageModal}
      />
      <ImageModalPost
        selectedImage={selectedImage}
        closeModal={closeImageModal}
      />
    </>
  );
};

export default ImageComponent4;
