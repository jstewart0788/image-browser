import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Button, Icon } from "antd";
import _ from 'lodash';
import Dictionary from "../Shared/Dictionary";
import { updateOneAsync } from "../Store/Images";

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
      mode: MODES.DEFAULT
    };
    this.removeTag = this.removeTag.bind(this);
  }

  setMode = mode => {
    this.setState({
      mode
    });
  };

  removeTag(tag) {
    const newImage = _.cloneDeep(this.props.selectedImage);
    newImage.tags.splice(newImage.tags.indexOf(tag), 1);
    this.props.updateOneAsync(newImage);
  }

  render() {
    const { selectedImage, open, toggleModal } = this.props;
    const { mode } = this.state;

    return selectedImage ? (
      <Modal
        title="Image Inspector"
        visible={open}
        onCancel={toggleModal}
        footer={null}
        width="max-content"
      >
        <div className="modal-container">
          <img
            className="selected-image"
            src={`https://s3.amazonaws.com/imagebrowser.com/training-set/${
              selectedImage.name
              }.jpg`}
            alt={selectedImage.name}
          />
          <h1>{selectedImage.name}</h1>
          <ul>
            {selectedImage.tags.map((tag, i) => (
              <li key={`${tag}-${i}`}>
                {tag} - <span className="tag-desc"> {Dictionary[tag]} </span>
                {mode === MODES.DELETE_TAG && (
                  <Button size="small" type="danger" onClick={this.removeTag.bind(null, tag)}>
                    <Icon type="close" />
                  </Button>
                )}
              </li>
            ))}
            {mode === MODES.NEW_TAG &&
              <li> test</li>
            }
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

export default connect(state => ({
  selectedImage: state.images.selectedImage
}), { updateOneAsync })(Inspector);
