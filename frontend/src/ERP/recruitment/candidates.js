import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const candidates = [
  {"name": "candidate 1", "email": "123fz@asdasd.com", "phone": "999999999", "address": "asdaskdj 123123 asdkjasdk as"},
  {"name": "candidate 2", "email": "dfsd@asdasd.com", "phone": "999999999", "address": "asd 123123 a as"},
  {"name": "candidate 3", "email": "dfgsd@asdasd.com", "phone": "999999999", "address": "1213 123123 asdkjasdk as"},
  {"name": "candidate 4", "email": "sdfxx@asdasd.com", "phone": "999999999", "address": "ddddzxd 123123 asdkjasdk as"}
];

const columns = [
  {
  dataField: 'name',
  text: 'Name',
  filter: textFilter()
  },
  {
  dataField: 'email',
  text: 'E-Mail ',
  filter: textFilter()
  },
  {
  dataField: 'phone',
  text: 'Contact',
  filter: textFilter()
  },
  {
  dataField: 'address',
  text: 'Address',
  filter: textFilter()
  }];

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

export default function Candidates() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Candidates'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <a href="newcandidate"><Button bsStyle="success" fill>New Candidate</Button></a><p></p>
            <BootstrapTable keyField='clienteID' data={ candidates } columns={ columns }
            pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

          </main>
        </div>
    );
}