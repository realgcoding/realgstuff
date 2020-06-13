import React from "react";
import { connect } from "react-redux";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch } from "react-router-dom";
import store from './store/store'
import Landing from "./components/Home/Landing";
import MovieInfoPage from "./components/Home/MovieInfoPage"
import SeriesInfo from "./components/Home/SeriesInfo";
import MDBNavbar from "./components/navbar";
import { loadUser } from './actions/authActions';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./App.css";

class App extends React.Component {
   componentDidMount(){
   store.dispatch(loadUser());
  }
  render() {
    return (
      <BrowserRouter>
      <div className="">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        {/* <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        ></link> */}
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Allerta+Stencil"
        ></link> */}
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <MDBNavbar/>
        <Home />
        {/* <Landing /> */}
        {/* <MovieInfoPage /> */}
        {/* <SeriesInfo /> */}
      </div>
      </BrowserRouter>
    );
  }
}

const stateMapper = (state) => {
  return state;
};

export default connect(stateMapper)(App);
