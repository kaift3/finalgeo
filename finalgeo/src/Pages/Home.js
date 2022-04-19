import React from "react";
import SpinningGlobe from "../Videos/SpinningGlobe.mp4";
import "./Home.css";

const Home = () => {
  return (
    <div className="section">
      <h1>Home</h1>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={SpinningGlobe} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
export default Home;
