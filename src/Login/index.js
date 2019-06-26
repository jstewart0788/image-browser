import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Form, Icon, Input, Tooltip } from "antd";
import { login, createUser } from "../Store/Global/security";

import "./styles.scss";

const loginState = {
  LOGIN: "Login to your account",
  REGISTER: "Register new account"
};

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      state: loginState.LOGIN
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }

  handleLogin = () => {
    const {
      history: { push }
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values, push);
      }
    });
  };

  handleRegister = () => {
    const {
      form: { validateFields, resetFields },
      history: { push }
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        this.props.createUser(values).then(() => {
          resetFields();
          this.props.login(values, push);
        });
      }
    });
  };

  toggleRegister() {
    this.setState(({ state }) => ({
      state:
        state === loginState.REGISTER ? loginState.LOGIN : loginState.REGISTER
    }));
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { state } = this.state;
    return state === loginState.LOGIN ? (
      <Form className="login-form">
        <Card
          title={state === loginState.LOGIN ? "Login" : "Register"}
          id="login"
          actions={[
            <Tooltip title="Login">
              <Icon type="login" onClick={this.handleLogin} />
            </Tooltip>,
            <Tooltip title="Forgot Password">
              <Icon type="question-circle" />
            </Tooltip>,
            <Tooltip title="Create a new user">
              <Icon type="user-add" onClick={this.toggleRegister} />
            </Tooltip>
          ]}
        >
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your Username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
        </Card>
      </Form>
    ) : (
      <Form className="login-form">
        <Card
          title={state === loginState.LOGIN ? "Login" : "Register"}
          id="login"
          actions={[
            <Tooltip title="Save" onClick={this.handleRegister}>
              <Icon type="save" />
            </Tooltip>,
            <Tooltip
              title="Clear Form"
              onClick={() => {
                resetFields();
              }}
            >
              <Icon type="delete" />
            </Tooltip>,
            <Tooltip title="Cancel" onClick={this.toggleRegister}>
              <Icon type="close-circle" />
            </Tooltip>
          ]}
        >
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Username" />)}
          </Form.Item>
        </Card>
      </Form>
    );
  }
}

export default withRouter(
  Form.create({ name: "login" })(
    connect(
      state => ({
        user: state.global.security.user
      }),
      { createUser, login }
    )(Login)
  )
);
