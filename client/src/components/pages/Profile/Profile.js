import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";

import ProfileDetails from "./ProfileDetails";

import {
  Avatar,
  AppBar,
  Badge,
  Box,
  Card,
  CardContent,
  Drawer,
  Divider,
  List,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import {
  mainListItems,
  secondaryListItems,
} from "../Dashboard/ListItems/listItems";

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationIcon,
} from "@material-ui/icons";

import { useStyles } from "./styles";

import { useSelector } from "react-redux";

const Profile = ({ className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

  const { user } = auth;

  const users = {
    role: user.role,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(true);
            }}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Profile
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <br />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Card className={clsx(classes.root, className)} {...rest}>
                <CardContent>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Avatar className={classes.avatar} />
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      {users.firstName} {users.lastName}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                      {`${users.role} ${users.email}`}
                    </Typography>
                    <Typography
                      className={classes.dateText}
                      color="textSecondary"
                      variant="body1"
                    >
                      {`${moment().format("hh:mm A")} WAT`}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
