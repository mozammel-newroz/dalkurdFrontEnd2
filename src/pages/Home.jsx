import React, {useContext} from "react";
import Sidebar from "../components/Sidebar";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const {auth} = useContext(AuthContext)
  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <div className="wrapper-inner">
          <Typography variant="h4">
            Welcome <span color="secondary">{auth.user.name} </span>
          </Typography>
          </div>
      </div>
    </div>
  );
};

export default Home;
