import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Button, Box} from '@material-ui/core';
import { Link } from "react-router-dom";

import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: '#f5f5f5',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

function TopB({ pageTitle, pageRoute, ...rest}) {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h4" color={'primary'} className={classes.title}>
                {pageTitle}
                </Typography>
                <Link to={'/sales/new'} style={{ textDecoration: 'none' }}>
                {(pageRoute === 0)
                  ? <Button  variant="contained" color="primary" size="large" startIcon={<AddCircleOutlineIcon/>} > New Sale </Button>
                  : <Button  variant="outlined" color="primary" size="large" startIcon={<AddCircleOutlineIcon/>} > New Sale </Button>
                }
                </Link>
                <Box ml={2} />

                <Link to={'/sales'} style={{ textDecoration: 'none' }}>
                {(pageRoute === 0)
                  ? <Button variant="outlined" color="primary" size="large" startIcon={<ViewListOutlinedIcon/>}> Manage Sales </Button>
                  : <Button variant="contained" color="primary" size="large" startIcon={<ViewListOutlinedIcon/>}> Manage Sales </Button>
                }
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default TopB;