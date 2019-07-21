import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { AutoComplete, Icon, Button, Input } from "antd";

import "./styles.scss";

class TagSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.onSelect = this.onSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async onSelect(tag) {
    const { tags: {allIds} } = this.props;
    this.props.handleSelection(tag);
    this.setState({
      dataSource: allIds.slice(0, 10),
      value: ""
    });
  }

  handleSearch(input) {
    const { tags: {allIds} } = this.props;
    this.setState({
      value: input,
      dataSource: allIds
        .filter(tag => tag.includes(input.toUpperCase()))
        .slice(0, 10)
    });
  }

  render() {
    const { placeholder } = this.props;
    const { dataSource, value } = this.state;
    return (
      <div className="filter-wrapper">
        <AutoComplete
          value={value}
          size="large"
          style={{ width: "100%" }}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          dataSource={dataSource}
          className="filter"
          placeholder={placeholder}
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
    );
  }
}

export default connect(state => ({
  tags: state.tags.tags
}))(TagSearch);
