import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { requestImages } from '../../services/api';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    totalImages: 0,
    q: '',
    isLoading: false,
    loadMore: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { q, page, error } = this.state;
    if (prevState.q !== q || prevState.page !== page) {
      this.getImages();
    }

    if (prevState.error !== error && error) {
      toast.error(error);
    }
  }

  async getImages() {
    const { q, page } = this.state;
    try {
      this.setState({ isLoading: true });

      const { images, totalImages } = await requestImages(q, page);

      if (!images.length) {
        toast.error('Images not found');
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        totalImages,
      }));
    } catch (error) {
      toast.error('Something went wrong');
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setQuery = q => {
    if (q === this.state.query) {
      toast.error('Please, change your request');
      return;
    }
    this.setState({
      q,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  render() {
    const { images, totalImages, isLoading } = this.state;

    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.setQuery} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {!isLoading && images.length < totalImages && (
          <Button loadMore={this.loadMore} />
        )}
        {isLoading && <Loader />}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          closeOnClick
          theme="colored"
        />
      </div>
    );
  }
}
