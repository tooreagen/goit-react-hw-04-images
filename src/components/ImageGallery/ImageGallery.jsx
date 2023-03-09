import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Modal } from '../Modal/Modal';


export class ImageGallery extends Component {
  state = {
    imageToModal: null,
    imageTags: null,
    showModal: false,
  };

  handleImageClick = (img, tags) => {
    this.setState({ imageToModal: img, imageTags: tags });
  };

  modalTogle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <>
        <ImageGalleryList onClick={this.modalTogle}>
          {this.props.imagesList.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                webformatURL={item.webformatURL}
                largeImageURL={item.largeImageURL}
                tags={item.tags}
                onClick={() =>
                  this.handleImageClick(item.largeImageURL, item.tags)
                }
              />
            );
          })}
        </ImageGalleryList>
        {this.state.showModal && (
          <Modal
            onModalClose={this.modalTogle}
            imageURL={this.state.imageToModal}
            imageAlt={this.state.imageTags}
          />
        )}
      </>
    );
  }
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
