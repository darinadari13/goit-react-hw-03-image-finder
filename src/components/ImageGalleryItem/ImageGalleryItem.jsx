import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <li className={css.item}>
        <img
          className={css.image}
          src={this.props.src}
          alt={this.props.tags}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            alt={this.props.tags}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
