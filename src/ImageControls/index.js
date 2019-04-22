import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { AutoComplete, Pagination, Icon, Button, Input } from "antd";
import {
  setFilter,
  fetchAllImages,
  fetchNumberOfImages
} from "../Store/Images";
import Dictionary from "../Shared/Dictionary";

import "./styles.scss";

class Inspector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: Object.keys(Dictionary).slice(0, 10),
      value: ""
    };
    this.onSelect = this.onSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  async onSelect(tag) {
    await this.props.setFilter(tag);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
    this.setState({
      value: ""
    });
  }

  handleSearch(input) {
    this.setState({
      value: input,
      dataSource: Object.keys(Dictionary)
        .filter(tag => tag.includes(input.toUpperCase()))
        .slice(0, 10)
    });
  }

  async clearFilter() {
    await this.props.setFilter(null);
    await this.props.handlePageChange(1);
    await this.props.fetchAllImages();
    await this.props.fetchNumberOfImages();
  }

  render() {
    const { count, handlePageChange, page, filter } = this.props;
    const { dataSource, value } = this.state;
    return (
      <div className="image-controls">
        <div className="filter-wrapper">
          <AutoComplete
            value={value}
            size="large"
            style={{ width: "100%" }}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            dataSource={dataSource}
            className="filter"
            placeholder="Filter Images"
          >
            <Input
              suffix={
                <Button className="search-btn" size="large" type="primary">
                  <Icon type="search" />
                </Button>
              }
            />
          </AutoComplete>
        </div>
        {filter && (
          <Button
            className="clear-filter-btn"
            size="large"
            type="danger"
            onClick={this.clearFilter}
          >
            {filter} <Icon type="close" />
          </Button>
        )}
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
