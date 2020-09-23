import React from "react";
import "./Homepage.css";
import Header from "../../components/header/Header";
import Slider from "../../components/slider/Slider";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <Slider />
      <div className="homepageContent">
        <Posts />
        <Sidebar />
      </div>
    </div>
  );
};

export default Homepage;
