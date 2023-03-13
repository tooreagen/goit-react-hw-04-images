import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';

export function ImageGallery({ imagesList }) {
  const [imageToModal, setImageToModal] = useState(null);
  const [imageTags, setImageTags] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (img, tags) => {
    setImageToModal(img);
    setImageTags(tags);
  };

  const modalTogle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageGalleryList onClick={modalTogle}>
        {imagesList.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              webformatURL={item.webformatURL}
              largeImageURL={item.largeImageURL}
              tags={item.tags}
              onClick={() => handleImageClick(item.largeImageURL, item.tags)}
            />
          );
        })}
      </ImageGalleryList>
      {showModal && (
        <Modal
          onModalClose={modalTogle}
          imageURL={imageToModal}
          imageAlt={imageTags}
        />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
};
