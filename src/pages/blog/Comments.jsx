import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SideBar from "../../components/SideBar";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: 24,
  },

  avatar: {
    backgroundColor: red[200],
  },
  icon_button: {
    background: '#ddd',
    marginRight: 10
  }
}));

const Comments = () => {
  const location = useLocation();
  const classes = useStyles();
  const state = location.state;
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);

  const getComment = async () => {
    setLoading(true);
    try {
      let url = `/public/blog/api/v1/comments?articleID=${state.id}`;
      let res = await axios({
        url: url,
        method: "get",
      });
      setComment(res.data.data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <>
      <div className="wrapper">
        <SideBar />
        <div className="wrapper_inner">
          <Typography variant="h4">
            <IconButton onClick={() => window.history.back()} className={classes.icon_button} >
              <ArrowBackIcon />
            </IconButton>
            {state.title}
          </Typography>

          { !loading && comment.length < 1 ? (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              No comments on this post
            </Typography>
          ) : null}

          {comment.map((e) => (
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <img src={e.commentatorPhoto} width="60px" alt="" />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={e.commentatorName}
                subheader={moment(e.updatedAt).format("DD-MMMM-YYYY")}
              />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {e.comment}
                </Typography>
              </CardContent>
            </Card>
          ))}

{loading ? <>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </> : null}

        </div>
      </div>
    </>
  );
};

export default Comments;
