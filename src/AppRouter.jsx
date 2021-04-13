import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Subscription from "./pages/subscription/SubscriptionViewAll";
import SubscriptionCreate from "./pages/subscription/SubscriptionCreate";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Blogall from "./pages/blog/Blogall";
import Signup from "./pages/auth/Signup";
import BlogCreate from "./pages/blog/BlogCreate";
import Comments from "./pages/blog/Comments";
import PrivateRoute from "./components/PrivateRoute";
import SubscriptionUpdate from "./pages/subscription/SubscriptionUpdate";
import SubscriptionImageUpdate from "./pages/subscription/SubscriptionImageUpdate";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          {/* <Route path="/blog">
            <Blogall />
          </Route>
          <Route path="/">
            <Home />
          </Route> */}

          <PrivateRoute path="/subscription" component={Subscription} />
          <PrivateRoute
            path="/subscription-create"
            component={SubscriptionCreate}
          />
          <PrivateRoute
            path="/subscription-update"
            component={SubscriptionUpdate}
          />
          <PrivateRoute
            path="/subscription-image-update"
            component={SubscriptionImageUpdate}
          />
          <PrivateRoute path="/blog" component={Blogall} />
          <PrivateRoute path="/blog-create" component={BlogCreate} />
          <PrivateRoute path="/comments" component={Comments} />
          <PrivateRoute exact path="/" component={Home} />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
