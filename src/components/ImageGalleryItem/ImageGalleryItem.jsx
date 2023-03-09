import { Component } from 'react';
import {
  ImageGalleryListItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <ImageGalleryListItem onClick={this.props.onClick}>
        <ImageGalleryItemImage
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
      </ImageGalleryListItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
