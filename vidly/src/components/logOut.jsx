import React, { Component } from "react";
import { logout } from "../services/authservice";
class LogOut extends Component {
  state = {};
  async componentDidMount() {
    await logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default LogOut;
