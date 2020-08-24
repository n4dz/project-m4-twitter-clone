import React from "react";
import styled from "styled-components";
import { TextField, ListItem, Avatar, Button } from "@material-ui/core";
import { CurrentUserContext } from "./CurrentUserContext";

import Tweet from "./Tweet";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textFieldform: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textField: {
    height: "50%",
    width: "50%",
  },
}));

const HomeFeed = () => {
  const classes = useStyles();
  const [homeFeedData, setHomeFeedData] = React.useState({
    tweetIds: [],
    tweetsById: {},
  });
  const { currentUser } = React.useContext(CurrentUserContext);
  const [newTweet, setNewTweet] = React.useState("");

  //function to fetch
  const fetchHomeFeed = () => {
    try {
      fetch("/api/me/home-feed", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setHomeFeedData(data);
        });
    } catch (error) {
      window.location.href = "/error";
    }
  };

  //New tweets
  const addTweet = () => {
    fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({ status: newTweet }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(
          fetch("/api/me/home-feed")
            .then((response) => response.json())
            .then((data) => {
              setHomeFeedData(data);
            }),
          100
        );
      })
      .catch((error) => {
        window.location.href = "/error";
      });
  };

  //calls the fuction to fetch
  React.useEffect(() => {
    fetchHomeFeed();
  }, []);

  return (
    <>
      <Wrapper>
        <form className={classes.textFieldForm} noValidate autoComplete="off">
          <ListItem>
            <Avatar
              src={currentUser.profile.avatarSrc}
              style={{ marginRight: "10px" }}
            />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="What's happening?"
              variant="outlined"
              inputProps={{ maxLength: 280 }}
              value={newTweet}
              onChange={(event) => {
                setNewTweet(event.target.value);
              }}
            />
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="primary"
              onClick={addTweet}
            >
              Meow
            </Button>
          </ListItem>
        </form>
        {homeFeedData.tweetIds.map((tweetId) => (
          <Tweet tweet={homeFeedData.tweetsById[tweetId]}></Tweet>
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 10%;
`;

export default HomeFeed;
