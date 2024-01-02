import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import * as API from '../ServicesApi/Api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast, Slide } from 'react-toastify';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const addImages = async () => {
      try {
        setIsLoading(true);

        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages((prevImages) => [...prevImages, ...normalizedImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.error('Something went wrong!', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Вызываем addImages при изменении searchName или currentPage
    if (searchName || currentPage > 1) {
      addImages();
    }
  }, [searchName, currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = (query) => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div className={css.App}>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
}
