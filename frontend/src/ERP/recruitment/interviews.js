import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const interviews = [
  {"id":1, "candidate": "candidate 1", "employee":"okasd asda", "date": "4/10/2010", "hour":"10:10"},
  {"id":2,"candidate": "candidate 2", "employee":"asdf asda", "date": "1/10/2010", "hour":"10:10"},
  {"id":3,"candidate": "candidate 3", "employee":"fxcv asda", "date": "10/10/2010", "hour":"10:10"}
];

const columns = [
  {
  dataField: 'candidate',
  text: 'Candidate',
  filter: textFilter()
  },
  {
  dataField: 'employee',
  text: 'Employee',
  filter: textFilter()
  },
  {
  dataField: 'date',
  text: 'Date'
  },
  {
  dataField: 'hour',
  text: 'Time'
  }
];

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

export default function Interviews() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Interviews'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <BootstrapTable keyField='id' data={ interviews } columns={ columns }
            pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

          </main>
        </div>
    );
}
