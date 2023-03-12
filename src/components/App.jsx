import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'API/PixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [queryString, setQueryString] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [firstRunning, setFirstRunning] = useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();
    const queryStringInput = evt.currentTarget.elements.search.value;
    if (!queryStringInput) {
      toast('Enter search text');
      return;
    }
    if (queryString !== queryStringInput) {
      setImages([]);
      setQueryString(queryStringInput);
      setPage(1);
      setFirstRunning(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (firstRunning) {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const imagesObject = await getImages(queryString, page);
        const imagesObjectFiltered = [];

        imagesObject.hits.map(item => {
          return imagesObjectFiltered.push({
            id: item.id,
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
            tags: item.tags,
          });
        });
        setImages([...images, ...imagesObjectFiltered]);
        setTotalHits(imagesObject.totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, queryString]);

  return (
    <Layout>
      <Searchbar handleSubmit={handleSubmit} />
      {error && <p>What is happening here anyway? Error: {error.message}</p>}

      <ImageGallery imagesList={images} />

      {images.length !== 0 && totalHits && images.length < totalHits && (
        <Button handleLoadMore={handleLoadMore} />
      )}

      {isLoading && <Loader />}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <GlobalStyle />
    </Layout>
  );
}
