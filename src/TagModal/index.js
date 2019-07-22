import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, Button, Input } from "antd";
import { toggleModal, postTagAsync } from "../Store/Tags";

import "./styles.scss";

class TagModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      code: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit() {
    const { desc, code } = this.state;
    this.props.postTagAsync({ desc, code });
    this.setState({ desc: "", code: "" });
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
    const { desc, code } = this.state;

    return (
      <Modal
        title="Create New Tag"
        visible={open}
        onCancel={this.handleCancel}
        footer={null}
        width="max-content"
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            name="code"
            value={code}
            addonBefore="Tag Code"
            onChange={this.handleOnChange}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input
            name="desc"
            value={desc}
            addonBefore="Tag Description"
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
    open: state.tags.modalOpen
  }),
  { toggleModal, postTagAsync }
)(TagModal);
