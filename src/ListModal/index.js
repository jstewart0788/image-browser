import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Button, Input } from "antd";
import { toggleModal, postListAsync } from "../Store/Lists";

import "./styles.scss";

class ListModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(body) {
    this.props.postListAsync(body);
    this.setState({ value: "" });
    this.handleCancel();
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCancel() {
    this.props.toggleModal();
  }

  render() {
    const { open } = this.props;
    const { value } = this.state;

    return (
      <Modal
        title="Create a List"
        visible={open}
        onCancel={this.handleCancel}
        footer={null}
        width="max-content"
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            addonBefore="List Name"
            name="value"
            value={value}
            onChange={this.handleOnChange}
          />
        </div>
        <Button onClick={this.handleSubmit} type="primary">
          Submit
        </Button>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    open: state.lists.modalOpen
  }),
  { toggleModal, postListAsync }
)(ListModal);
