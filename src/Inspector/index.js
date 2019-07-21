import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Button, Icon, Input, Row, Col } from "antd";
import _ from "lodash";
import Dictionary from "../Shared/Dictionary";
import { updateOneAsync } from "../Store/Images";
import { arrayBufferToBase64 } from "../Shared/Utility/buffer";
import TagSearch from "../Shared/Components/TagSearch";

import "./styles.scss";

const MODES = {
  DEFAULT: "default",
  NEW_TAG: "new",
  DELETE_TAG: "delete",
  CUSTOM_MESSAGE: "custom"
};

class Inspector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: MODES.DEFAULT,
      imageSrc: null
    };
    this.removeTag = this.removeTag.bind(this);
    this.toggleModalMeta = this.toggleModalMeta.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedImage } = this.props;
    if (prevProps.selectedImage != selectedImage && selectedImage) {
      const base64Flag = `data:${selectedImage.img.contentType};base64,`;
      const imageStr = arrayBufferToBase64(selectedImage.img.data.data);
      this.setState({ imageSrc: base64Flag + imageStr });
    }
  }

  setMode = mode => {
    this.setState({
      mode
    });
  };

  removeTag(tag) {
    const newImage = _.cloneDeep(this.props.selectedImage);
    newImage.codes.splice(newImage.codes.indexOf(tag), 1);
    this.props.updateOneAsync(newImage);
  }

  toggleModalMeta() {
    this.props.toggleModal();
    this.setState({ mode: MODES.DEFAULT });
  }

  handleAddTag(tag) {
    const newImage = _.cloneDeep(this.props.selectedImage);
    newImage.codes.push(tag);
    this.props.updateOneAsync(newImage);
  }

  render() {
    const { selectedImage, open } = this.props;
    const { mode, imageSrc } = this.state;

    return selectedImage ? (
      <Modal
        title="Image Inspector"
        visible={open}
        onCancel={this.toggleModalMeta}
        footer={null}
        width="max-content"
      >
        <div className="inspector">
          <img
            className="selected-image"
            src={imageSrc}
            alt={selectedImage.name}
          />
          <h1>{selectedImage.name}</h1>
          <ul>
            {selectedImage.codes.map((tag, i) => (
              <li key={`${tag}-${i}`}>
                {tag} - <span className="tag-desc"> {Dictionary[tag]} </span>
                {mode === MODES.DELETE_TAG && (
                  <Button
                    size="small"
                    type="danger"
                    onClick={this.removeTag.bind(null, tag)}
                  >
                    <Icon type="close" />
                  </Button>
                )}
              </li>
            ))}
            {mode === MODES.NEW_TAG && (
              <Row>
                <Col span={8}>
                  <li>
                    <TagSearch
                      size="small"
                      placeholder="Search for Tag to add"
                      handleSelection={this.handleAddTag}
                    />
                  </li>
                </Col>
                <Col span={16} />
              </Row>
            )}
          </ul>
          <div className="action-bar">
            {mode === MODES.DEFAULT && (
              <>
                <Button
                  size="small"
                  type="primary"
                  onClick={this.setMode.bind(null, MODES.NEW_TAG)}
                >
                  Add new tag <Icon type="plus" />
                </Button>
                <Button
                  size="small"
                  onClick={this.setMode.bind(null, MODES.CUSTOM_MESSAGE)}
                >
                  Add custom description <Icon type="edit" />
                </Button>
                <Button
                  size="small"
                  type="danger"
                  onClick={this.setMode.bind(null, MODES.DELETE_TAG)}
                >
                  Delete Tag <Icon type="close" />
                </Button>
              </>
            )}
            {mode !== MODES.DEFAULT && (
              <Button
                size="small"
                type="primary"
                onClick={this.setMode.bind(null, MODES.DEFAULT)}
              >
                Done <Icon type="check" />
              </Button>
            )}
          </div>
        </div>
      </Modal>
    ) : null;
  }
}

export default connect(
  state => ({
    selectedImage: state.images.selectedImage
  }),
  { updateOneAsync }
)(Inspector);
