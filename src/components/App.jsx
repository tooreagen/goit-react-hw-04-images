import { Component } from 'react';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'API/PixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    queryString: '',
    page: 1,
    isLoading: false,
    error: null,
    totalHits: 0,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const queryString = evt.currentTarget.elements.search.value;
    if (!queryString) {
      toast('Enter search text');
      return;
    }
    if (this.state.queryString !== queryString) {
      this.setState({
        images: [],
        queryString: queryString,
        page: 1,
      });
    }
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.queryString !== this.state.queryString
    ) {
      try {
        this.setState({ isLoading: true });
        const page = this.state.page;
        const queryString = this.state.queryString;
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

        this.setState(prevState => ({
          images: [...prevState.images, ...imagesObjectFiltered],
          totalHits: imagesObject.totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    return (
      <Layout>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.error && (
          <p>
            What is happening here anyway? Error: {this.state.error.message}
          </p>
        )}

        <ImageGallery imagesList={this.state.images} />

        {this.state.images.length !== 0 &&
          this.state.totalHits &&
          this.state.images.length < this.state.totalHits && (
            <Button handleLoadMore={this.handleLoadMore} />
          )}

        {this.state.isLoading && <Loader />}
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
          theme="light"
        />
        <GlobalStyle />
      </Layout>
    );
  }
}