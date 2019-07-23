import React, { PureComponent } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Avatar,
  Modal,
  Button,
  Input,
  Form,
  Icon,
  Row,
  Col,
  Comment,
  List,
  Tooltip,
  Popover
} from "antd";
import _ from "lodash";
import { updateOneAsync } from "../Store/Images";
import { postMessageAsync } from "../Store/Messages";
import { arrayBufferToBase64 } from "../Shared/Utility/buffer";
import TagSearch from "../Shared/Components/TagSearch";

import "./styles.scss";

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  const data = comments.map(comment => ({
    author: comment.postedBy,
    avatar: <Avatar size="small" icon="user" />,
    content: comment.content,
    datetime: (
      <Tooltip title={moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
        <span>{moment(comment.createdAt).fromNow()}</span>
      </Tooltip>
    )
  }));
  return (
    <List
      dataSource={data}
      header={`${comments.length} ${
        comments.length > 1 ? "comments" : "comment"
      }`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const MODES = {
  DEFAULT: "default",
  NEW_TAG: "new",
  DELETE_TAG: "delete"
};

class Inspector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: MODES.DEFAULT,
      imageSrc: null,
      submitting: false,
      value: ""
    };
    this.removeTag = this.removeTag.bind(this);
    this.toggleModalMeta = this.toggleModalMeta.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedImage } = this.props;
    if (prevProps.selectedImage !== selectedImage && selectedImage) {
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

  handleSubmit = () => {
    const { selectedImage } = this.props;
    const { value } = this.state;
    if (!value || !selectedImage) {
      return;
    }

    this.setState({
      submitting: true
    });
    this.props
      .postMessageAsync({ id: selectedImage._id, content: value })
      .then(() => {
        this.setState({
          submitting: false,
          value: ""
        });
      })
      .catch(() => {
        this.setState({
          submitting: false,
          value: ""
        });
      });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  FilterList = lists =>
    lists.length > 0 ? (
      <div>
        {lists.map(({name}, i) => (
          <p key={`${name}-${i}`}>{name}</p>
        ))}
      </div>
    ) : (
      <div> No Lists Available </div>
    );

  render() {
    const { selectedImage, open, content, lists, tags } = this.props;
    const { mode, imageSrc, value, submitting } = this.state;

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
          <div className="container">
            <span className="stretch" />
            <h1>{selectedImage.name}</h1>
            <Popover
              placement="bottom"
              content={this.FilterList(lists)}
              title="Choose list to add image"
            >
              <Button style={{ marginTop: 5 }} shape="circle" icon="right" />
            </Popover>
            <span className="stretch" />
          </div>
          <ul>
            {selectedImage.codes.map((tag, i) => (
              <li key={`${tag}-${i}`}>
                {tag} -{" "}
                <span className="tag-desc">
                  {" "}
                  {tags[tag] && tags[tag].description}{" "}
                </span>
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
          <div className="message-box">
            <div>
              {content.length > 0 && <CommentList comments={content} />}
              <Comment
                content={
                  <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                  />
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    ) : null;
  }
}

export default connect(
  state => ({
    selectedImage: state.images.selectedImage,
    content: state.messages.content,
    lists: state.lists.options,
    tags: state.tags.tags.byIds
  }),
  { updateOneAsync, postMessageAsync }
)(Inspector);
