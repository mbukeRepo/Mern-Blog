import React from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import SinglePost from "./pages/singlePost/SinglePost";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Write from "./pages/write/Write";
import Header from "./components/header/Header";
import MultiPost from "./pages/multiPost/MultiPost";
import Account from "./pages/account/Account";
import NotFound from "./pages/notFound/NotFound";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((store) => store.auth);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Homepage />
            <Footer />
          </Route>
          <Route path={"/login"}>
            {!currentUser ? <Login /> : <Homepage />}
          </Route>
          <Route path={"/register"}>
            {!currentUser ? <Register /> : <Homepage />}
          </Route>
          <Route path={"/write"}>
            {currentUser ? (
              <>
                <Header />
                <Write />
              </>
            ) : (
              <Login />
            )}
          </Route>
          <Route path={"/post/:postId"}>
            <Header />
            <SinglePost />
            <Footer />
          </Route>
          <Route path={"/user/:userId"}>
            <Header />
            <MultiPost />
            <Footer />
          </Route>
          <Route path={"/account"}>
            {currentUser ? (
              <>
                <Header />
                <Account />
                <Footer />
              </>
            ) : (
              <Login />
            )}
          </Route>
          <Route path={"/404"}>
            <NotFound />
          </Route>
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
