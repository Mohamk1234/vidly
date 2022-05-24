import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
          {!this.props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {this.props.user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {this.props.user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  LogOut
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
