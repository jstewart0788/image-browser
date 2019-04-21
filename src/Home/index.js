import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button, Card } from "antd";
import { fetchAllImages, selectImage } from "../Store/Images";
import Inspector from "../Inspector";

import "./styles.scss";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      modal: false
    };
    this.getNextPage = this.getNextPage.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllImages();
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

  getNextPage() {
    const page = this.state.page + 1;
    this.props.fetchAllImages(page);
    this.setState({ page });
  }

  render() {
    const { images } = this.props;
    return (
      <div className="Home">
        {/* <button type="button" onClick={this.getNextPage}>
          Next
        </button> */}
        <div className="image-container">
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
  { fetchAllImages, selectImage }
)(Home);
