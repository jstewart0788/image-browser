import React from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import Dictionary from "../Shared/Dictionary";

import "./styles.scss";

const Inspector = props => {
  const { selectedImage, open, toggleModal } = props;
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
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  ) : null;
};

export default connect(state => ({
  selectedImage: state.images.selectedImage
}))(Inspector);
