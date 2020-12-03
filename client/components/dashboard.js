//----------Imports-------------
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  schoolData,
  handleProgClickThunk,
  handleEthnClickThunk,
  handleRetClickThunk,
} from '../store';
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
  Container,
  Grid,
  Paper,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import BarChartIcon from '@material-ui/icons/BarChart';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import {
  EthnicityChart,
  ProgramChart,
  RetChart,
  SchoolInfo,
  Welcome,
} from '../components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

//---------Logic/styling for MaterialUI---------------------
const drawerWidth = 245;
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
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard(props) {
  //MaterialUI -------------
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  /*
  react hook, useEffect, allows functional components to have similiar functionality
  to componentDidMount().
  */
  useEffect(() => {
    props.getSchoolData();
  }, []); //[] prevents useEffect from constantly updating.

  //These two functions control the opening and closing of side menu
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Function for saving page as PDF.
  const pageToPdf = () => {
    //Grabs div to capture
    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
      //converts page to img
      const img = canvas.toDataURL('image/png');
      //creates new PDF
      const pdf = new jsPDF('p', 'mm', [window.innerWidth, window.innerHeight]);
      //Adds image to PDF
      pdf.addImage(img, 'JPEG', 0, 0);
      //saves the image as PDF
      pdf.save('download.pdf');
    });
  };

  //Utility function that helps pick which chart to render based on redux state
  const chartRender = (prog, ethn) => {
    if (prog) {
      return <ProgramChart programData={props.programData} />;
    } else if (ethn) {
      return <EthnicityChart ethnicityData={props.ethnicityData} />;
    } else {
      return <RetChart retentionData={props.retentionData} />;
    }
  };

  //Download data button utility function
  const downloadHelper = () => {
    let link = '';
    if (props.progBtn) {
      link =
        'https://drive.google.com/uc?export=download&id=1zy5OPZs4Rdc-7OoF-Mat9Hqfz_1YdYcJ';
    } else if (props.ethnBtn) {
      link =
        'https://drive.google.com/uc?export=download&id=1HbtNx-XulTzCZ3ClFcTpJvNaLdTBretH';
    } else {
      link =
        'https://drive.google.com/uc?export=download&id=1oX8NAKUAFCPwo0hATFnEiocbpYErfeMS';
    }
    return (
      <BottomNavigationAction
        href={`${link}`}
        download
        label="Download Current Data"
        icon={<GetAppIcon />}
      />
    );
  };

  return (
    <div id="divToPrint" className={classes.root}>
      <CssBaseline />
      {/* <------- TOP NAV -------> */}
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
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Data Dashboard
          </Typography>
          <Button className={classes.rightToolbar} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* <------- SIDE NAV -------> */}
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
        <Typography variant="h6" align="center">
          Data
        </Typography>
        <Divider />
        <List>
          {/* Program Button */}
          <ListItem button onClick={() => props.handleProgClick()}>
            <ListItemIcon>
              <DonutLargeIcon />
            </ListItemIcon>
            <ListItemText primary="Program Percentages" />
          </ListItem>
          {/* Ethnicity Button */}
          <ListItem button onClick={() => props.handleEthnClick()}>
            <ListItemIcon>
              <DonutLargeIcon />
            </ListItemIcon>
            <ListItemText primary="Ethnicity Percentages" />
          </ListItem>
          {/* Retention Button */}
          <ListItem button onClick={() => props.handleRetClick()}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Retention Percentages" />
          </ListItem>
        </List>
      </Drawer>
      {/* <------- CONTENT -------> */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* <------- Grid items -------> */}
            {/* Welcome */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Welcome />
              </Paper>
            </Grid>
            {/* School Data Grid */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <SchoolInfo school={props.school} total={props.total} />
              </Paper>
            </Grid>
          </Grid>
          {/* CHARTS */}
          <Grid container spacing={3} justify="center">
            <Grid item xs={6} md={6} lg={6}>
              <Paper className={classes.paper}>
                {chartRender(props.progBtn, props.ethnBtn, props.retBtn)}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* <------- BOTTOM NAV -------> */}
      <BottomNavigation showLabels className={classes.bottomNav}>
        <BottomNavigationAction
          label="Print Page"
          icon={<PrintIcon />}
          onClick={() => {
            window.print();
          }}
        />
        <BottomNavigationAction
          label="Save As PDF"
          icon={<PictureAsPdfIcon />}
          onClick={() => {
            pageToPdf();
          }}
        />
        {downloadHelper()}
      </BottomNavigation>
    </div>
  );
}

//------Redux Logic--------------------
const mapState = (state) => {
  return {
    school: state.data.school,
    ethnicityData: state.data.ethData,
    programData: state.data.progData,
    retentionData: state.data.retData,
    total: state.data.total,
    progBtn: state.buttons.progBtn,
    ethnBtn: state.buttons.ethnBtn,
    retBtn: state.buttons.retBtn,
  };
};

const mapDispatch = (dispatch) => ({
  getSchoolData: () => dispatch(schoolData()),
  handleProgClick: () => dispatch(handleProgClickThunk()),
  handleEthnClick: () => dispatch(handleEthnClickThunk()),
  handleRetClick: () => dispatch(handleRetClickThunk()),
});

export default connect(mapState, mapDispatch)(Dashboard);
