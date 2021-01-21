import React from "react";
import { Route, Switch } from "react-router-dom";
import { NavBar } from "../Component/NavBar";
import { Footer } from "../Component/Footer";
import { Home } from "../Component/Pages/Home";
import { ProductDetail } from "../Component/Pages/ProductDetail";
import { Cart } from "../Component/Pages/Cart";
import { Login } from "../Component/Pages/Login";
import { Register } from "../Component/Pages/Register";
import PrivateRoute from "./PrivateRoute";
import { Profile } from "../Component/Pages/Profile";
import { Header } from "../Component/Header";
import { ContactUs } from "../Component/Pages/ContactUs";

export function Routes() {
  return (
    <div>
      <Route path="/" render={(props) => <Header {...props} />} />
      <Route path="/" render={(props) => <NavBar {...props} />} />
      <Switch>
        <PrivateRoute exact path="/cart" Component={Cart} />
        <PrivateRoute exact path="/profile" Component={Profile} />
        <Route
          path="/product"
          exact
          render={(props) => <ProductDetail {...props} />}
        />
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/account/login"
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/account/register"
          exact
          render={(props) => <Register {...props} />}
        />
        <Route
          path="/contact-us"
          exact
          render={(props) => <ContactUs {...props} />}
        />
      </Switch>
      <Route path="/" render={(props) => <Footer {...props} />} />
    </div>
  );
}
