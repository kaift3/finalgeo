import React, { useState, useContext } from "react";
import SpinningGlobe from "../../Assets/videos/SpinningGlobe.mp4";
import "../../Assets/css/Home.css";

const Landing = () => {
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

export default Landing;
