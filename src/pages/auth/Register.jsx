import React from "react";
import { Typography, IconButton } from "@material-ui/core";

import SideBar from "../../components/SideBar";

const Home = () => {
  return (
    <div className="wrapper">
      <SideBar />
      <div className="wrapper_inner">
        <Typography variant="h4">Headline</Typography>
        <Typography>Register page</Typography>
      </div>
    </div>
  );
};

export default Home;
