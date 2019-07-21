import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import {
  fetchAllImages,
  fetchNumberOfImages,
  selectImage
} from "../Store/Images";
import Inspector from "../Inspector";
import Uploader from "../Uploader";
import ImageControls from "../ImageControls";

import "./styles.scss";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      modal: false
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllImages();
    this.props.fetchNumberOfImages();
  }

  async selectImage(image) {
    await this.props.selectImage(image);
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
  };

  handlePageChange(page) {
    this.props.fetchAllImages(page);
    this.setState({ page });
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  render() {
    const { images } = this.props;
    const { page } = this.state;
    return (
      <div className="Home">
        <div className="image-container">
          <ImageControls handlePageChange={this.handlePageChange} page={page} />
          <div className="image-row">
            {images.length > 0 ? (
              images
                .sort((a, b) => a.createdAt - b.createdAt)
                .map(image => {
                  const base64Flag = `data:${image.img.contentType};base64,`;
                  var imageStr = this.arrayBufferToBase64(image.img.data.data);
                  const imageSrc = base64Flag + imageStr;
                  return (
                    <div key={image.name} className="image-wrapper">
                      <Card
                        hoverable
                        onClick={this.selectImage.bind(null, image)}
                        cover={
                          <img
                            className="image"
                            src={imageSrc}
                            alt={image.name}
                          />
                        }
                      >
                        <Card.Meta title={image.name} />
                      </Card>
                    </div>
                  );
                })
            ) : (
              <div>
                No images match the tag chosen. Please choose another tag or
                clear the filter.
              </div>
            )}
          </div>
        </div>
        <Inspector open={this.state.modal} toggleModal={this.toggleModal} />
        <Uploader />
      </div>
    );
  }
}

export default connect(
  state => ({
    images: state.images.images
  }),
  { fetchAllImages, selectImage, fetchNumberOfImages }
)(Home);
