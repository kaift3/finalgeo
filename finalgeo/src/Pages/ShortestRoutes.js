import { Button } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import tags from "../Data/List";

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
        <div className="left-sidebar" style={{ backgroundColor: "#212121" }}>
          <div
            style={{
              position: "fixed",
              backgroundColor: "#212121",
              boxSizing: "border-box",
              width: "30vw",
            }}
          >
            <h1
              style={{
                color: "white",
                boxSizing: "border-box",
              }}
            >
              All Tags
            </h1>
          </div>
          <ul style={{ paddingTop: "10vh" }}>
            {/* <li>
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
            </li> */}
            {tags.map((e, index) => {
              return (
                <div
                  key={e.name + "-" + index}
                  style={{ backgroundColor: "#212121" }}
                >
                  <li>
                    <div>
                      <h2>{e.location}</h2>
                      <h5>{e.name}</h5>
                    </div>
                  </li>
                </div>
              );
            })}
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

      <Button onClick={toggleDrawerLeft}>Left</Button>
      <Button onClick={toggleDrawerRight}>Right</Button>
    </>
  );
};
export default GeoTag;
