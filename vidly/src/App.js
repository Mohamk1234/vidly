import "./App.css";
import React, { Component } from "react";
import Movies from "./components/movies";
import { Route } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import LogOut from "./components/logOut";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./services/authservice";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/logout" component={LogOut}></Route>
            <Redirect exact from="/" to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
