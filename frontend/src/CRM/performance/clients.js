import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const clients = [
  {"id": 1, "name":"name 1", "address": "address 1", "phone": "phone 1", "email": "example1@gmail.com"},
  {"id": 2,"name":"name 2", "address": "address 2", "phone": "phone 2", "email": "example2@gmail.com"},
  {"id": 3, "name": "name 3", "address": "address 3", "phone": "phone 3", "email": "example3@gmail.com"},
  {"id": 4, "name":"name 4", "address": "address 4", "phone": "phone 4", "email": "example4@gmail.com"}
];


const columns = [
  {
    dataField: 'name',
    text: 'Name',
    filter: textFilter()
  },
  {
    dataField: 'address',
    text: 'Address',
    filter: textFilter()
  },
  {
    dataField: 'phone',
    text: 'Phone',
    filter: textFilter()
  },
  {
    dataField: 'email',
    text: 'Email',
    filter: textFilter()
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

export default function Clients() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Clients'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <a href="new_client"><Button bsStyle="success">New Client</Button></a><p></p>
            <BootstrapTable keyField='id' data={ clients } columns={ columns }
            pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

          </main>
        </div>
    );
}
