import { useState, useEffect } from "react";
import moment from "moment";
import {
  CssBaseline,
  Container,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Badge,
  Grid,
  Paper,
  List,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationIcon,
} from "@material-ui/icons";
import { mainListItems, secondaryListItems } from "./ListItems/listItems";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../utils/Notification";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
import axios from "axios";
import { useStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllPosts,
  dispatchGetAllPosts,
} from "../../../redux/actions/postsAction";
import Footer from "../../Footer";

const initialState = {
  title: "",
  message: "",
  saved: "",
  filled: "",
  healed: "",
  disciple: "",
  error: "",
  success: "",
};

const DashBoard = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);

  const [data, setData] = useState(initialState);

  const {
    title,
    message,
    saved,
    filled,
    healed,
    disciple,
    error,
    success,
  } = data;

  useEffect(() => {
    const token = localStorage.getItem("firstLogin");

    if (token) {
      fetchAllPosts(token).then((res) => {
        dispatch(dispatchGetAllPosts(res));
      });
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("firstLogin");
      e.preventDefault();

      const newMinistryPost = await axios.post(
        "/api/post",
        {
          title,
          message,
          saved,
          filled,
          healed,
          disciple,
        },
        {
          headers: { Authorization: token },
        }
      );

      console.log(newMinistryPost);

      setData({
        ...data,
        error: "",
        success:
          "Post has successfully been created. Kindly refresh your browser!",
      });
    } catch (error) {
      setData({ ...data, error: error.response.data.message, success: "" });
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("firstLogin");
    try {
      if (posts._id !== id) {
        if (window.confirm("Are you sure you want to delete this post?")) {
          await axios.delete(`/api/post/delete/${id}`, {
            headers: { Authorization: token },
          });
        }
      }
    } catch (err) {
      setData({ ...data, error: error.response.data.message, success: "" });
    }
  };

  // const updatePost = async (id) => {
  //   const token = localStorage.getItem("firstLogin");
  //   try {
  //     axios.patch(
  //       `/api/post/edit/${id}`,
  //       {
  //         title: title ? title : posts.title,
  //         message: message ? message : posts.message,
  //       },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );

  //     setData({ ...data, error: "", success: "Updated Successfully!" });
  //   } catch (error) {
  //     setData({ ...data, error: error.response.data.message, success: "" });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
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
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h1" variant="h4" color="inherit">
            Welcome {auth.user.firstName} {auth.user.lastName}
          </Typography>
          <br />
          <Alert severity="warning">
            {" "}
            Broiler Plate on how to post - Title: *Summary of instructions
            received*... Message: This will contain - *EVANGELISM/DISCIPLESHIP:*
            Details of those met during outreach.... AND / OR Discipleship: A
            brief summary of who you met and what was taught.
          </Alert>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <div>
                {error && showErrorMessage(error)}
                {success && showSuccessMessage(success)}

                <Divider />

                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  noValidate
                  className={clsx(classes.root, className)}
                  {...rest}
                >
                  <Card>
                    <CardHeader
                      subheader="
                        Post daily ministry activities
                        "
                      title="Ministry Activities"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            name="title"
                            onChange={handleChange}
                            required
                            label="Title"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            onChange={handleChange}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Number of Saved"
                            name="saved"
                            onChange={handleChange}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Number of Filled"
                            name="filled"
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Number of Healed"
                            name="healed"
                            onChange={handleChange}
                            required
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Numbers of Disciples"
                            name="disciple"
                            onChange={handleChange}
                            required
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Box display="flex" justifyContent="flex-start" p={2}>
                        <Button
                          onClick={handleSubmit}
                          color="primary"
                          variant="contained"
                        >
                          Save details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                  <Divider />
                </form>
              </div>
            </Grid>
            <div className={classes.appBarSpacer} />
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Box minWidth={500}>
                  <div style={{ overflowX: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Time Ago</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Message</TableCell>
                          <TableCell>Saved</TableCell>
                          <TableCell>Filled</TableCell>
                          <TableCell>Healed</TableCell>
                          <TableCell>Number of Disciples</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post._id}>
                            <TableCell>
                              {moment(post.createdAt).fromNow()}
                            </TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.message}</TableCell>
                            <TableCell>{post.saved}</TableCell>
                            <TableCell>{post.filled}</TableCell>
                            <TableCell>{post.healed}</TableCell>
                            <TableCell>{post.disciple}</TableCell>
                            <TableCell>
                              {/* <i
                                onClick={() => updatePost(post._id)}
                                className="fa fa-edit"
                                title="Edit"
                              ></i> */}
                              <i
                                className="fa fa-trash"
                                title="Remove"
                                onClick={() => handleDelete(post._id)}
                              ></i>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  );
};

export default DashBoard;
