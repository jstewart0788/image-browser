import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Pagination, Icon, Button } from "antd";
import TagSearch from "../Shared/Components/TagSearch";
import {
  setFilter,
  fetchAllImages,
  fetchNumberOfImages
} from "../Store/Images";

import "./styles.scss";

class Inspector extends PureComponent {
  constructor(props) {
    super(props);
    this.clearFilter = this.clearFilter.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  async clearFilter(code) {
    const { filter } = this.props;
    const newFilter = filter.filter(item => item !== code);
    await this.props.setFilter(newFilter);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  async handleSelection(tag) {
    const { filter } = this.props;
    await this.props.setFilter([...filter, tag]);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  render() {
    const { count, handlePageChange, page, filter } = this.props;
    return (
      <div className="image-controls">
        <TagSearch
          placeholder="Filter Images"
          handleSelection={this.handleSelection}
          showIcon
        />
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
    filter: state.images.filter
  }),
  { setFilter, fetchAllImages, fetchNumberOfImages }
)(Inspector);
