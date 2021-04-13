import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import CreatePromotion from "./pages/promotion/CreatePromotion";
import PromotionList from "./pages/promotion/PromotionList";
import PromotionDetails from "./pages/promotion/PromotionDetails";
import CreateRole from "./pages/manageRole/CreateRole";
import ViewRole from "./pages/manageRole/ViewRole";
import AddUser from "./pages/manageAccess/AddUser";
import ViewUser from "./pages/manageAccess/ViewUser";
import SendNotification from "./pages/pushNotification/SendNotification";
import NotificationList from "./pages/pushNotification/NotificationList";
import ManageFaq from "./pages/faq/ManageFaq";
import HowToVideos from "./pages/howToVideos/HowToVideos";
import NotFound from "./pages/NotFound";
import VideosDetails from "./pages/howToVideos/VideosDetails";
import UpdateLink from "./pages/howToVideos/UpdateLink";
import ViewFaq from "./pages/faq/ViewFaq";
import NewFaq from "./pages/faq/NewFaq";
import NewVideo from "./pages/howToVideos/NewVideo";
import PrivateRoute from "./components/PrivateRoute";
import UpdateFaq from "./pages/faq/UpdateFaq";
import ChangePassword from "./pages/auth/ChangePassword";
import UpdatePromotion from "./pages/promotion/UpdatePromotion";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const useSttyle = makeStyles({
  root: {
    background: "#EEEFF3",
  },
  rootContent: {
    margin: 30,
  },
});

const AppRouter = () => {
  const classes = useSttyle();
  return (
    <Router>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:otp">
            <ResetPassword />
          </Route>
          {/* <PrivateRoute path="/home">
            <Home />
          </PrivateRoute> */}
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/create-promotion" component={CreatePromotion} />
          <PrivateRoute path="/update-promotion" component={UpdatePromotion} />
          <PrivateRoute path="/promotion-list" component={PromotionList} />
          <PrivateRoute
            path="/promotion-details"
            component={PromotionDetails}
          />
          <PrivateRoute path="/create-role" component={CreateRole} />
          <PrivateRoute path="/view-role" component={ViewRole} />
          <PrivateRoute path="/add-user" component={AddUser} />
          <PrivateRoute path="/view-user" component={ViewUser} />
          <PrivateRoute
            path="/send-notification"
            component={SendNotification}
          />
          <PrivateRoute
            path="/notification-list"
            component={NotificationList}
          />
          <PrivateRoute path="/manage-faq" component={ManageFaq} />
          <PrivateRoute path="/view-faq" component={ViewFaq} />
          <PrivateRoute path="/new-faq" component={NewFaq} />
          <PrivateRoute path="/update-faq" component={UpdateFaq} />
          <PrivateRoute path="/how-to-videos" component={HowToVideos} />
          <PrivateRoute path="/update-link" component={UpdateLink} />
          <PrivateRoute path="/video-details" component={VideosDetails} />
          <PrivateRoute path="/new-video" component={NewVideo} />

          <PrivateRoute path="/change-password" component={ChangePassword} />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
