//----------Imports-------------
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, schoolData} from '../store';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import BarChartIcon from '@material-ui/icons/BarChart';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';

//---------Logic/styling for MaterialUI---------------------
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 36,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}));

function Navbar(props) {
  //MaterialUI functions-------------
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  /*
  react hook, useEffect, allows functional components to have similiar functionality
  to componentDidMount().
  */

  useEffect(() => {
    props.getSchoolData();
  }, []); //[] prevents useEffect from constantly updating.

  console.log('PROPS -------->', props.school);

  //These two functions control the opening and closing of side menu
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Education Analytics
          </Typography>
          <Button className={classes.rightToolbar} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Typography variant="h6">Data</Typography>
        <Divider />
        <List>
          {['Program Percentages', 'Race/Ethnicity', 'Other Metric'].map(
            (text, idx) => (
              <ListItem button key={idx}>
                <ListItemIcon>
                  {text !== 'Other Metric' ? (
                    <DonutLargeIcon />
                  ) : (
                    <BarChartIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Name:{props.school.name}, Website: {props.school.school_url} City:
          State:{props.school.state} Zip:{props.school.zip} Total Students:
          {props.total.grad_12_month + props.total.undergrad_12_month}
        </Typography>
        <Typography paragraph>More stuff.</Typography>
      </main>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction label="Print Page" icon={<PrintIcon />} />
        <BottomNavigationAction
          label="Save As PDF"
          icon={<PictureAsPdfIcon />}
        />
        <BottomNavigationAction label="Download Data" icon={<GetAppIcon />} />
      </BottomNavigation>
    </div>
  );
}

//------Redux Logic--------------------

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    school: state.data.school,
    ethnicityData: state.data.ethData,
    programData: state.data.progData,
    retentionData: state.data.retData,
    total: state.data.total,
  };
};

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout());
  },
  getSchoolData: () => dispatch(schoolData()),
});

export default connect(mapState, mapDispatch)(Navbar);
