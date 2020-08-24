import React, { Component } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { FiMapPin, FiCalendar } from "react-icons/fi";
import {
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";

import { CurrentUserContext } from "./CurrentUserContext";

import Tweet from "./Tweet";

const Profile = () => {
  let { profileId } = useParams();
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const [otherUser, setOtherUser] = React.useState(null);
  const [profileTweets, setProfileTweets] = React.useState({
    tweetIds: [],
    tweetsById: {},
  });

  // getting profileId thats not "me"
  React.useEffect(() => {
    if (profileId == ":profileId") {
      window.location.href = "/profile/me";
    }
    if (profileId !== "me") {
      fetch(`/api/${profileId}/profile`)
        .then((response) => response.json())
        .then((data) => {
          setOtherUser(data);
        })
        .catch((error) => {
          window.location.href = "/error";
        });
    }
  }, []);

  React.useEffect(() => {
    if (profileId == "me") {
      profileId = "treasurymog";
    }
    fetch(`/api/${profileId}/feed`)
      .then((response) => response.json())
      .then((data) => {
        setProfileTweets(data);
      })
      .catch((error) => {
        window.location.href = "/error";
      });
  }, []);

  return (
    //get other user profile info with author name if exist else get current user
    <>
      {otherUser ? (
        <Wrapper>
          <BackgroundPic src={otherUser.profile.bannerSrc} />
          <ProfilePic src={otherUser.profile.avatarSrc} />

          <Box position="absolute" top={540} left="15%" zIndex="tooltip">
            <p>{otherUser.profile.handle}</p>
            <p>{otherUser.profile.displayName}</p>
          </Box>

          {/* <Location>
        <FiMapPin style={{ position: "relative" }}></FiMapPin>

        <p>{currentUser.profile.location}</p>
      </Location> */}
          <Box position="absolute" top={640} zIndex="tooltip">
            <ListItem>
              <FiCalendar> </FiCalendar>
              <ListItemText style={{ marginLeft: "10px" }}>
                {otherUser.profile.joined}
              </ListItemText>
              <FiMapPin style={{ marginLeft: "5px" }}> </FiMapPin>
              <ListItemText style={{ marginLeft: "10px" }}>
                {otherUser.profile.location}
              </ListItemText>
            </ListItem>
          </Box>

          {/* <p>{currentUser.profile.location}</p> */}
          {/* <p>{currentUser.profile.joined}</p> */}
          <Box position="absolute" top={660} left="11%" zIndex="tooltip">
            <p>
              {otherUser.profile.numFollowing} Following{" "}
              {otherUser.profile.numFollowers} Followers
            </p>
            {/* <p>{currentUser.profile.numLikes}</p> */}
            <p>{otherUser.profile.isFollowingYou}</p>
            <p>{otherUser.profile.isBeingFollowedByYou}</p>
          </Box>

          <Box position="absolute" top={700} left="40%" zIndex="tooltip">
            <Tabs>
              <Tab label="Tweets" />
              <Tab label="Media" />
              <Tab label="Likes" />
            </Tabs>
          </Box>
        </Wrapper>
      ) : (
        <Wrapper>
          <BackgroundPic src={currentUser.profile.bannerSrc} />
          <ProfilePic src={currentUser.profile.avatarSrc} />

          <Box position="absolute" top={540} left="15%" zIndex="tooltip">
            <p>{currentUser.profile.handle}</p>
            <p>{currentUser.profile.displayName}</p>
          </Box>

          {/* <Location>
        <FiMapPin style={{ position: "relative" }}></FiMapPin>

        <p>{currentUser.profile.location}</p>
      </Location> */}
          <Box position="absolute" top={640} zIndex="tooltip">
            <ListItem>
              <FiCalendar> </FiCalendar>
              <ListItemText style={{ marginLeft: "10px" }}>
                {currentUser.profile.joined}
              </ListItemText>
              <FiMapPin style={{ marginLeft: "5px" }}> </FiMapPin>
              <ListItemText style={{ marginLeft: "10px" }}>
                {currentUser.profile.location}
              </ListItemText>
            </ListItem>
          </Box>

          {/* <p>{currentUser.profile.location}</p> */}
          {/* <p>{currentUser.profile.joined}</p> */}
          <Box position="absolute" top={660} left="11%" zIndex="tooltip">
            <p>
              {currentUser.profile.numFollowing} Following{" "}
              {currentUser.profile.numFollowers} Followers
            </p>
            {/* <p>{currentUser.profile.numLikes}</p> */}
            <p>{currentUser.profile.isFollowingYou}</p>
            <p>{currentUser.profile.isBeingFollowedByYou}</p>
          </Box>

          <Box position="absolute" top={700} left="40%" zIndex="tooltip">
            <Tabs>
              <Tab label="Tweets" />
              <Tab label="Media" />
              <Tab label="Likes" />
            </Tabs>
          </Box>
        </Wrapper>
      )}

      {/* Show tweets and retweets for the corresponding profile id */}
      <TweetWrapper>
        {profileTweets.tweetIds.map((tweetId) => (
          <Tweet tweet={profileTweets.tweetsById[tweetId]}></Tweet>
        ))}
      </TweetWrapper>
    </>
  );
};

const TweetWrapper = styled.div`
  margin: 10%;
  margin-top: 25%;
`;

const Wrapper = styled.div`
  margin-left: 10%;
`;

const ProfilePic = styled.img`
  width: 20%;
  height: 25%;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 12%;
`;

const BackgroundPic = styled.img`
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
`;

// const Location = styled.span`
//   display: inline-block;
//   text-align: right;
// `;

export default Profile;
