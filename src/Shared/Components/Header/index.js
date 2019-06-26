import React from "react";
import { withRouter } from "react-router"; // react-router v4
import { PageHeader, Icon, Tooltip } from "antd";

import "./styles.scss";

const Header = props => (
  <PageHeader
    className="header"
    title="Medical Image Brower"
    extra={
      <Tooltip title="Switch Users" placement="bottomRight">
        <Icon
          onClick={() => {
            props.history.push("/login");
          }}
          type="logout"
        />
      </Tooltip>
    }
  />
);

export default withRouter(Header);
