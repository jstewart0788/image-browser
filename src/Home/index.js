import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button, Card } from "antd";
import {
  fetchAllImages,
  fetchNumberOfImages,
  selectImage
} from "../Store/Images";
import Inspector from "../Inspector";
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

  render() {
    const { images } = this.props;
    const { page } = this.state;
    return (
      <div className="Home">
        <div className="image-container">
          <ImageControls handlePageChange={this.handlePageChange} page={page} />
          <div className="image-row">
            {images
              .sort((a, b) => a.createdAt - b.createdAt)
              .map(image => (
                <div key={image.name} className="image-wrapper">
                  <Card
                    hoverable
                    onClick={this.selectImage.bind(null, image)}
                    cover={
                      <img
                        className="image"
                        src={`https://s3.amazonaws.com/imagebrowser.com/training-set/${
                          image.name
                        }.jpg`}
                        alt={image.name}
                      />
                    }
                  >
                    <Card.Meta title={image.name} />
                  </Card>
                </div>
              ))}
          </div>
        </div>
        <Inspector open={this.state.modal} toggleModal={this.toggleModal} />
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
