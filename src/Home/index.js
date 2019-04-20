import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchAllImages } from "../Store/Images";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.getNextPage = this.getNextPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllImages();
  }

  getNextPage() {
    const page = this.state.page + 1;
    this.props.fetchAllImages(page);
    this.setState({ page });
  }

  render() {
    const { images } = this.props;
    return (
      <div className="Home">
        <h1>Hello Image Proc!</h1>
        <button type="button" onClick={this.getNextPage}>
          Next
        </button>
        {images
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(image => (
            <img
              key={image.name}
              src={`https://s3.amazonaws.com/imagebrowser.com/training-set/${
                image.name
              }.jpg`}
              alt={image.name}
            />
          ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    images: state.images.images
  }),
  { fetchAllImages }
)(Home);
