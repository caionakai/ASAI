import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

export default function Purchase() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Purchase'}/>
          <Sidebar currentPage={4} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            PUT YOUR CONTENT HERE -> RECOMMEND: GRID AND PAPERS MATERIAL UI

          </main>
        </div>
    );
}