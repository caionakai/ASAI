import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import AddIcon from '@material-ui/icons/Add';

const services = [
  {"id": 1,"designation": "designation 1", "idemployee": 1, "idservicetype": 1, "idclient": 2, "date": "4/10/2010"},
  {"id": 2,"designation": "designation 2", "idemployee": 2, "idservicetype": 3, "idclient": 1, "date": "4/10/2010"},
  {"id": 3,"designation": "designation 3", "idemployee": 3, "idservicetype": 2, "idclient": 3, "date": "4/10/2010"},
  {"id": 4,"designation": "designation 4", "idemployee": 4, "idservicetype": 4, "idclient": 4, "date": "4/10/2010"}
];

function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
          <div onClick={event =>  window.location.href='/performance/new_feedback/' + row.id}
              style={{ textAlign: "center",
                 cursor: "pointer",
                lineHeight: "normal" }}>
                     <AddIcon
                       style={{ fontSize: 20 }}
                      />
          </div>
); }

const columns = [
  {
    dataField: 'designation',
    text: 'Designation',
    filter: textFilter()
  },
  {
    dataField: 'idemployee',
    text: 'Employee',
    filter: textFilter()
  },
  {
    dataField: 'idservicetype',
    text: 'Service Type',
    filter: textFilter()
  },
  {
    dataField: 'idclient',
    text: 'Client',
    filter: textFilter()
  },
  {
    dataField: 'date',
    text: 'Date',
  },
  {
    dataField: 'new',
    text: "Add feedback",
    formatter: rankFormatter,
    headerAttrs: { width: 100 }
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

export default function Services() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Services'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <a href="new_service"><Button bsStyle="success">New Service</Button></a><p></p>
            <BootstrapTable keyField='id' data={ services } columns={ columns }
            pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

          </main>
        </div>
    );
}
