import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';

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

export default function Performance() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Performance'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <div className="mb-2">
              <a href="/performance/service_types"><Button bsStyle="success" fill>Service Types</Button></a><p></p>
              <a href="/performance/feedbacks"><Button bsStyle="success" fill>Feedbacks</Button></a><p></p>
              <a href="/performance/services"><Button bsStyle="success" fill>Services</Button></a><p></p>
            </div>

          </main>
        </div>
    );
}
