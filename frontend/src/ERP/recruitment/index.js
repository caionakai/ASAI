import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

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
            <div onClick={event =>  window.location.href="/recruit/candidates"}
                style={{ textAlign: "center",
                   cursor: "pointer",
                  lineHeight: "normal" }}>
                    <h2>New Candidate</h2>
                       <PersonAddIcon
                         style={{ fontSize: 85 }}
                        />
                      <p></p>
                  </div>
                  <div onClick={event =>  window.location.href="/recruit/interviews"}
                      style={{ textAlign: "center",
                         cursor: "pointer",
                        lineHeight: "normal" }}>
                          <h2>Interviews</h2>
                             <SupervisorAccountIcon
                               style={{ fontSize: 85 }}
                              />

                        </div>
  <p></p>
                    <div onClick={event =>  window.location.href="/recruit/hire"}
                        style={{ textAlign: "center",
                           cursor: "pointer",
                          lineHeight: "normal" }}>
                            <h2>Hire</h2>
                               <PersonAddIcon
                                 style={{ fontSize: 85 }}
                                />

                          </div>
            </div>

          </main>
        </div>
    );
}
