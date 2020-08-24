import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

import HomeFeed from "../components/HomeFeed";
import Notifications from "../components/Notifications";
import Bookmarks from "../components/Bookmarks";
import TweetDetails from "../components/TweetDetails";
import Profile from "../components/Profile";
import Error from "../components/Error";
import Logo from "../assets/logo.svg";

const Sidebar = () => {
  return (
    <>
      <Router>
        <Drawer variant="permanent" anchor="left">
          <List>
            <ListItem button component={Link} to="/">
              <img src={Logo} alt=""></img>
            </ListItem>

            <ListItem button component={Link} to="/">
              <FiHome style={{ marginRight: "10px" }}> </FiHome>
              <ListItemText> Home</ListItemText>
            </ListItem>

            <ListItem button component={Link} to="/profile/:profileId">
              <FiUser style={{ marginRight: "10px" }}></FiUser>
              <ListItemText>Profile</ListItemText>
            </ListItem>

            <ListItem button component={Link} to="/notifications">
              <FiBell style={{ marginRight: "10px" }}></FiBell>
              <ListItemText>Notifications</ListItemText>
            </ListItem>

            <ListItem button component={Link} to="/bookmarks">
              <FiBookmark style={{ marginRight: "10px" }}></FiBookmark>
              <ListItemText>Bookmarks</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main>
          <Route exact path="/" component={HomeFeed} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/bookmarks" component={Bookmarks} />
          <Route exact path="/tweet/:tweetId" component={TweetDetails} />
          <Route exact path="/profile/:profileId" component={Profile} />
          <Route exact path="/error" component={Error} />
        </main>
      </Router>
    </>
  );
};

export default Sidebar;
