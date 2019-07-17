import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Icon } from "antd";
import { toggleUploader, uploadMultipleImages } from "../Store/Images";

import "./styles.scss";

class Uploader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesSuccess: false,
      metaSuccess: false,
      imageFile: null,
      metaFile: null
    };
    this.handleImageUploaderChange = this.handleImageUploaderChange.bind(this);
    this.handleMetaUploaderChange = this.handleMetaUploaderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageUploaderChange(e) {
    const imageFile = e.target.files[0];
    if (imageFile)
      this.setState({
        imageFile,
        imagesSuccess: true
      });
  }

  handleMetaUploaderChange(e) {
    const metaFile = e.target.files[0];
    if (metaFile)
      this.setState({
        metaFile,
        metaSuccess: true
      });
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append("images", this.state.imageFile);
    formData.append("meta", this.state.metaFile);
    this.props.uploadMultipleImages(formData);
  }

  render() {
    const { open } = this.props;
    const { imagesSuccess, metaSuccess } = this.state;

    return (
      <Modal
        title="Upload Images"
        visible={open}
        onCancel={this.props.toggleUploader}
        footer={null}
        width="max-content"
      >
        <div className="uploader">
          <div className="icon-wrapper">
            <label htmlFor="image-uploader" className="uploader-icon noselect">
              <Icon
                type="file-zip"
                theme={imagesSuccess && "twoTone"}
                twoToneColor="#52c41a"
              />
              <span className={imagesSuccess && "success"}>Attatch Images</span>
            </label>
            <label htmlFor="meta-uploader" className="uploader-icon noselect">
              <Icon
                type="reconciliation"
                theme={metaSuccess && "twoTone"}
                twoToneColor="#52c41a"
              />
              <span className={metaSuccess && "success"}>Attatch Meta</span>
            </label>
          </div>
          <div className="confirmation">
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
          <input
            id="image-uploader"
            type="file"
            onChange={this.handleImageUploaderChange}
          />
          <input
            id="meta-uploader"
            type="file"
            onChange={this.handleMetaUploaderChange}
          />
        </div>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    open: state.images.uploaderOpen
  }),
  { toggleUploader, uploadMultipleImages }
)(Uploader);
