import React, { PureComponent, createRef } from "react";
import { connect } from "react-redux";
import { Modal, Icon, Button, Input } from "antd";
import { toggleUploader, uploadMultipleImages } from "../Store/Images";

import "./styles.scss";

const { TextArea } = Input;

class Uploader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagesSuccess: false,
      metaSuccess: false,
      imageFile: null,
      metaFile: null,
      desc: ""
    };

    this.imageUploader = createRef();
    this.metaUploader = createRef();

    this.handleImageUploaderChange = this.handleImageUploaderChange.bind(this);
    this.handleMetaUploaderChange = this.handleMetaUploaderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDetatchFile = this.handleDetatchFile.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.resetState = this.resetState.bind(this);
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
    console.log(metaFile);
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
    formData.append("desc", this.state.desc);
    this.props.uploadMultipleImages(formData, this.handleCancel);
  }

  handleDetatchFile(fileType) {
    switch (fileType) {
      case "meta":
        this.metaUploader.value = null;
        this.setState({
          metaSuccess: false,
          metaFile: null
        });
        break;
      case "image":
        this.imageUploader.value = null;
        this.setState({
          imagesSuccess: false,
          imageFile: null
        });
        break;
      default:
    }
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCancel() {
    this.props.toggleUploader();
    this.resetState();
  }

  resetState() {
    this.metaUploader.value = null;
    this.imageUploader.value = null;
    this.setState({
      imagesSuccess: false,
      imageFile: null,
      metaSuccess: false,
      metaFile: null,
      desc: ""
    });
  }

  render() {
    const { open } = this.props;
    const {
      imagesSuccess,
      metaSuccess,
      imageFile,
      metaFile,
      desc
    } = this.state;

    return (
      <Modal
        title="Upload Images"
        visible={open}
        onCancel={this.handleCancel}
        footer={null}
        width="max-content"
      >
        <div className="uploader">
          <div
            className={`icon-wrapper${imagesSuccess ? " upload-ready" : ""}`}
          >
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
            {imagesSuccess && (
              <div className="file-list-item">
                <Icon className="plus" type="plus" />
                <span className="text">{imageFile.name}</span>
                <span className="stretch" />
                <Icon
                  onClick={this.handleDetatchFile.bind(null, "image")}
                  className="cross"
                  type="cross"
                />
              </div>
            )}
            {metaSuccess && (
              <div className="file-list-item">
                <Icon className="plus" type="plus" />
                <span className="text"> {metaFile.name}</span>
                <span className="stretch" />
                <Icon
                  onClick={this.handleDetatchFile.bind(null, "meta")}
                  className="cross"
                  type="cross"
                />
              </div>
            )}
            <div className="bottom-form">
              <TextArea
                rows={4}
                value={desc}
                name="desc"
                onChange={this.handleOnChange}
                placeholder="Description. . ."
              />

              <Button onClick={this.handleSubmit} disabled={!imagesSuccess}>
                Submit
              </Button>
            </div>
          </div>
          <input
            id="image-uploader"
            type="file"
            onChange={this.handleImageUploaderChange}
            ref={ref => (this.imageUploader = ref)}
          />
          <input
            id="meta-uploader"
            type="file"
            onChange={this.handleMetaUploaderChange}
            ref={ref => (this.metaUploader = ref)}
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
