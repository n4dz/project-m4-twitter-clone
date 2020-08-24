import React, { Component } from "react";

import styled from "styled-components";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  ListItem,
  ListItemText,
  CardActions,
  IconButton,
  Icon,
} from "@material-ui/core";

import {
  FiHome,
  FiUser,
  FiBell,
  FiBookmark,
  FiShare,
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiRepeat,
} from "react-icons/fi";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "70%",
    margin: "5%",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Tweet = ({ tweet }) => {
  const classes = useStyles();

  const [colorHeart, setColorHeart] = React.useState("black");

  let mediaSrc;
  if (tweet.media[0]) {
    mediaSrc = tweet.media[0].url;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          onClick={() => {
            // redirects the url path to the corresponding clicked profile
            window.location.href = "/profile/" + tweet.author.handle;
          }}
          avatar={<Avatar src={tweet.author.avatarSrc}></Avatar>}
          title={tweet.author.displayName}
          subheader={tweet.author.handle}
        />
        <h4 style={{ marginLeft: "30px" }}>{tweet.status}</h4>
        {mediaSrc ? (
          <CardMedia className={classes.media} image={mediaSrc} />
        ) : (
          <p></p>
        )}

        <CardContent>
          <ListItem>
            <FiCalendar style={{ marginRight: "10px" }}> </FiCalendar>
            <ListItemText> {tweet.timestamp}</ListItemText>
          </ListItem>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FiHeart
              style={{ color: colorHeart }}
              onClick={() => {
                if (colorHeart === "black") {
                  setColorHeart("red");
                } else {
                  setColorHeart("black");
                }
              }}
            />
          </IconButton>
          <IconButton>
            <FiMessageCircle />
          </IconButton>
          <IconButton>
            <FiRepeat />
          </IconButton>
          <IconButton aria-label="share">
            <FiShare />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Tweet;
