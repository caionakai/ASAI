import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const feedbacks = [
  {"id": 1, "idservice":1, "evaluation": "evaluation 1", "description": "description 1", "date": "4/10/2010"},
  {"id": 2,"idservice":2, "evaluation": "evaluation 2", "description": "description 2", "date": "4/10/2010"},
  {"id": 3, "idservice":3, "evaluation": "evaluation 3", "description": "description 3", "date": "4/10/2010"},
  {"id": 4, "idservice":4, "evaluation": "evaluation 4", "description": "description 4", "date": "4/10/2010"}
];


const columns = [
  {
    dataField: 'idservice',
    text: 'Service',
    filter: textFilter()
  },
  {
    dataField: 'evaluation',
    text: 'Evaluation',
    filter: textFilter()
  },
  {
    dataField: 'description',
    text: 'Description',
    filter: textFilter()
  },
  {
    dataField: 'date',
    text: 'Date',
  },
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

export default function Feedbacks() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Feedbacks'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <BootstrapTable keyField='id' data={ feedbacks } columns={ columns }
            pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

          </main>
        </div>
    );
}
