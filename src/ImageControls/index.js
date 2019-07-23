import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Pagination, Icon, Button, Select } from "antd";
import TagSearch from "../Shared/Components/TagSearch";
import {
  setFilter,
  fetchAllImages,
  fetchNumberOfImages,
  setListFilter
} from "../Store/Images";

import "./styles.scss";

const { Option } = Select;

class Inspector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this.clearFilter = this.clearFilter.bind(this);
    this.clearList = this.clearList.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.handleListSelection = this.handleListSelection.bind(this);
  }

  async clearFilter(code) {
    const { filter } = this.props;
    const newFilter = filter.filter(item => item !== code);
    await this.props.setFilter(newFilter);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  async clearList() {
    this.setState({ value: null });
    await this.props.setListFilter(null);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  async handleTagSelection(tag) {
    const { filter } = this.props;
    await this.props.setFilter([...filter, tag]);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  async handleListSelection(listname) {
    if (this.state.value) return;
    const { lists } = this.props;
    this.setState({ value: listname });
    const list = lists.find(list => list.name === listname);
    await this.props.setListFilter(list);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  render() {
    const {
      count,
      handlePageChange,
      page,
      filter,
      lists,
      listFilter
    } = this.props;
    const { value } = this.state;
    return (
      <div className="image-controls">
        <TagSearch
          placeholder="Filter Images"
          handleSelection={this.handleTagSelection}
          showIcon
        />
        <Select
          onChange={this.handleListSelection}
          size="large"
          style={{ marginLeft: 30, width: 200 }}
          suffixIcon={<Icon type="filter" />}
          placeholder={
            lists.length > 0
              ? "Select a list to filter by"
              : "Create a list to filter"
          }
          disabled={!!value}
          value={value}
        >
          {lists.map(({ name }) => (
            <Option key={`option${name}`} value={name}>
              {name}
            </Option>
          ))}
        </Select>
        {listFilter && (
          <Button
            className="clear-filter-btn"
            size="large"
            type="danger"
            onClick={this.clearList.bind()}
            style={{ marginLeft: 30 }}
          >
            Clear List Filter
            <Icon type="close" />
          </Button>
        )}
        <div className="clear-btn-wrapper">
          {filter.map(item => (
            <Button
              className="clear-filter-btn"
              size="large"
              type="danger"
              onClick={this.clearFilter.bind(null, item)}
            >
              {item} <Icon type="close" />
            </Button>
          ))}
        </div>
        <span className="stretch" />
        <Pagination
          current={page}
          defaultCurrent={1}
          defaultPageSize={20}
          total={count}
          onChange={handlePageChange}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    count: state.images.count,
    filter: state.images.filter,
    listFilter: state.images.listFilter,
    lists: state.lists.options
  }),
  { setListFilter, setFilter, fetchAllImages, fetchNumberOfImages }
)(Inspector);
