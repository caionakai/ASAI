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

export default function Recruitment() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Recruitment'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className="mb-2">
              <a href="/recruit/candidates"><Button bsStyle="success">Candidates</Button></a><p></p>
              <a href="/recruit/interviews"><Button bsStyle="success">Interviews</Button></a><p></p>
              <a href="/recruit/hire"><Button bsStyle="success">Hire</Button></a><p></p>
            </div>

          </main>
        </div>
    );
}
