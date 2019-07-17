import React from "react";
import { withRouter } from "react-router"; // react-router v4
import { connect } from "react-redux";
import { PageHeader, Icon, Tooltip } from "antd";
import { toggleUploader } from "../../../Store/Images";

import "./styles.scss";

const Header = props => (
  <PageHeader
    className="header"
    title={
      <span
        className="title"
        onClick={() => {
          props.history.push("/");
        }}
      >
        Medical Image Brower
      </span>
    }
    extra={
      props.user && (
        <>
          <Tooltip title="Add Images" placement="bottomRight">
            <Icon
              className="header-image"
              onClick={props.toggleUploader}
              type="appstore"
            />
          </Tooltip>
          <Tooltip title="Switch Users" placement="bottomRight">
            <Icon
              onClick={() => {
                props.history.push("/login");
              }}
              type="logout"
            />
          </Tooltip>
        </>
      )
    }
  />
);

export default withRouter(
  connect(
    state => ({
      user: state.global.security.user
    }),
    { toggleUploader }
  )(Header)
);
