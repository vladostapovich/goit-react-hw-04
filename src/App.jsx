import { useState, useEffect } from "react";
import fetchImages from "./components/Img-api/Img-api.js";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import Loader from "./components/Loader/Loader";

import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loadState, setLoadState] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetcData = async () => {
      setLoadState(true);
      try {
        const { results, total } = await fetchImages(query, page);
        if (page === 1) {
          setImages(results);
          setTotalImages(total);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }
        setLoadState(false);
        if (total === 0) {
          toast.error("Query applies to 0 images");
        }
      } catch (error) {
        setError("Error fetching images.");
        setLoadState(false);
      }
    };
    if (query !== "") {
      fetcData();
    }
  }, [query, page]);
  useEffect(() => {
    if (images.length === totalImages && totalImages !== 0) {
      toast.error("No images to load(");
    }
  }, [images, totalImages]);

  const handleSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const openModal = (image) => {
    setModalIsOpen(true);
    setSelectedImage(image);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {loadState && <Loader />}
      {images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onLoadMore={loadMoreImages} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        image={selectedImage}
      />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default App;
