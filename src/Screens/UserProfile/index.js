import React, { Profiler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./Components/SideNav";
import * as Content from "./Components/Content";
import * as Bio from "./Components/Bio/index";
import TopNav from "./Components/TopNav";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EditProfile from "./Components/EditProfile";
import Stack from '@mui/material/Stack';
/* import Followers from "./Components/Followers"; */
/* import Following from "./Components/Following"; */
import * as Header from "./Components/Header";
import Notification from "./Components/Notification";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import user1 from '../../Assets/Admin/random.jpg';
import "./index.css";
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance, BACKEND_API } from "../../axios/AxiosInstance";
import { updateUser } from "../../store/action/authAction";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Upload' },
  { icon: <PrintIcon />, name: 'Print' },
  //{ icon: <ShareIcon />, name: 'Share' },
];

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function UserProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.authReducer);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  const initialUserState = {
    userId: user.userID,
    firstName: user.fname,
    lastName: user.lname,
    userImage: user.userImage,
    userName: user.userName,
    bio: user.bio,
  }
  const [userDetails, setUserDetails] = useState(initialUserState);


  const handleEnableUpdate = () => {
    setIsUpdate(true);
  }

  const handleDisableUpdate = () => {
    setUserDetails(initialUserState)
    setIsUpdate(false);
  }

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    })
  }


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { subpath } = useParams();

  const handleUpdate = async () => {
    await axiosInstance({
      method: 'POST',
      url: BACKEND_API.UPDATE_USER,
      data: userDetails
    }).then(res => {
      if (res.status === 200) {
        enqueueSnackbar("Updated User Details", {
          variant: 'success'
        });

        dispatch(updateUser({
          userID: userDetails.userId,
          fname: userDetails.firstName,
          lname: userDetails.lastName,
          userImage: userDetails.userImage,
          bio: userDetails.bio,
        }))
        setIsUpdate(false);
      }
    }).catch((error) => {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, {
          variant: 'error'
        });
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: 'error'
        });
      }
    });
  }

  return (
    <div>
      <div class="columns">
        <div class="column is-2">
          <SideNav />
        </div>
        <div class="column is-10">
          <TopNav />
          {subpath === "content" && <Content />}
          {subpath === "bio" && <Bio />}
          {subpath === "EditProfile" && <EditProfile />}
          {/* {subpath === "followers" && <Followers />} */}
          {/*  {subpath === "following" && <Following />} */}
          {subpath === "header" && <Header />}
          {subpath === "Notification" && <Notification />}




          <div class="columns is-gapless is-multiline is-mobile">
            <div class="column is-one-third" align="center">
              <img id="user" src={user1} width="300" height="300" style={{ borderRadius: 1000 / 2, marginTop: "10%", borderColor: 'black', borderWidth: 5 }} />
            </div>
            <div class="column is-one-third">
              <div class="columns is-gapless is-multiline is-mobile">
                <div class="column"><b><a class="name">
                  <input
                    value={userDetails.firstName + " " + userDetails.lastName}
                    disabled={!isUpdate}
                    type="text" name={"name"}
                  />
                </a></b></div>
              </div>
              <div class="columns is-gapless is-multiline is-mobile" id="content1">
                <div class="column is-one-third">89</div>
                <div class="column is-one-third">66</div>
              </div>
              <div class="columns is-gapless is-multiline is-mobile" id="content">
                <div class="column is-one-third">#Followers</div>
                <div class="column is-one-third">#Following</div>
              </div>
              <div class="columns is-gapless is-multiline is-mobile">
                <div class="column">
                  <table class="GeneratedTable">
                    <thead>
                      <tr>
                        <th class="bio">
                          Bio
                        </th>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>
                            <input
                            value={userDetails.bio}
                            disabled={!isUpdate}
                            type="text" name={"bio"}
                          />
                          </td>
                        </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <div class="columns is-gapless is-multiline is-mobile">
                {/*   <div class="column is-half"><button>Follow</button></div>
            <div class="column is-half"><button>Message</button></div> */}
              </div>
            </div>

            <div class="column is-one-third">
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="error" className="bg-red">
                  Report
                </Button>
              </Stack>
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Feed" value="1" />
                    <Tab label="Cover" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Container className={classes.cardGrid} maxWidth="auto">

                    <Grid container spacing={4}>
                      {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                            <CardMedia
                              className={classes.cardMedia}
                              image="https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
                              title="Image title"
                            />

                            <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                Post
                              </Typography>
                              <Typography>
                                Click here to check your likes and comments
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
                                Like
                              </Button>
                              <Button size="small" color="primary">
                                Comment
                              </Button>
                            </CardActions>
                          </Card>



                        </Grid>

                      ))}

                    </Grid>

                  </Container>
                </TabPanel>
                <TabPanel value="2">
                  <Container className={classes.cardGrid} maxWidth="auto">

                    <Grid container spacing={4}>
                      {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                            <CardMedia
                              className={classes.cardMedia}
                              image="https://images.unsplash.com/photo-1514582086679-4024becf927e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                              title="Image title"
                            />

                            <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                Post
                              </Typography>
                              <Typography>
                                Click here to check your likes and comments
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
                                Like
                              </Button>
                              <Button size="small" color="primary">
                                Comment
                              </Button>
                            </CardActions>
                          </Card>



                        </Grid>

                      ))}

                    </Grid>

                  </Container>
                </TabPanel>
              </TabContext>
            </Box>



          </div>


        </div>

      </div>





    </div>

  )
}


// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     author: '@helloimnik',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     author: '@nolanissac',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     author: '@hjrc33',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     author: '@silverdalex',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     author: '@southside_customs',
//   },
// ];
