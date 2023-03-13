import {
  ImageGalleryListItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ onClick, webformatURL, tags }) {
  return (
    <ImageGalleryListItem onClick={onClick}>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
      />
    </ImageGalleryListItem>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
