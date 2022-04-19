import { Button } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";

import "./GeoTag.css";

const GeoTag = () => {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  const toggleDrawerLeft = () => {
    setOpenLeft(!openLeft);
  };

  const toggleDrawerRight = () => {
    setOpenRight(!openRight);
  };

  return (
    <>
      <Sidebar anchor={"left"} open={openLeft} toggleDrawer={toggleDrawerLeft}>
        <div className="left-sidebar">
          <h1 style={{ color: "white" }}>All Tags</h1>
          <ul>
            <li>
              <div>
                <h2>kaif home</h2>
                <h5>kaift3</h5>
              </div>
            </li>
            <li>
              <div>
                <h2>anurag home</h2>
                <h5>kaift3</h5>
              </div>
            </li>
            <li>
              <div>
                <h2>samiran home</h2>
                <h5>kaift3</h5>
              </div>
            </li>
          </ul>
        </div>
      </Sidebar>

      <Sidebar
        anchor={"right"}
        open={openRight}
        toggleDrawer={toggleDrawerRight}
      >
        <div className="right-sidebar">
          <h1 style={{ color: "white" }}>Info</h1>
          <div className="tags-info"></div>
        </div>
      </Sidebar>
      <div className="container">
        <h1
          className="text-center"
          style={{ paddingTop: "10%", color: "blue", alignContent: "center" }}
        >
          GeoTag
        </h1>
        <Button onClick={toggleDrawerLeft}>Left</Button>
        <Button onClick={toggleDrawerRight}>Right</Button>
      </div>
    </>
  );
};
export default GeoTag;
