import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import AddIcon from '@material-ui/icons/Add';

const candidates = [
  {"id":1,"name": "candidate 11", "email": "123fz@asdasd.com", "phone": "999999999", "address": "asdaskdj 123123 asdkjasdk as"},
  {"id":2,"name": "candidate 21", "email": "dfsd@asdasd.com", "phone": "999999999", "address": "asd 123123 a as"},
  {"id":3,"name": "candidate 31", "email": "dfgsd@asdasd.com", "phone": "999999999", "address": "1213 123123 asdkjasdk as"},
  {"id":4,"name": "candidate 41", "email": "sdfxx@asdasd.com", "phone": "999999999", "address": "ddddzxd 123123 asdkjasdk as"}
];

function rankFormatter(cell, row, rowIndex, formatExtraData) {
     return (
           <div onClick={event =>  window.location.href='/recruit/newemployee/' + row.id}
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
  },
  {
  dataField: "new",
  text: "Hire",
  formatter: rankFormatter,
  headerAttrs: { width: 85 }
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

export default function Hire() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Recommended candidates'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <BootstrapTable keyField='id' data={ candidates } columns={ columns }
            pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

          </main>
        </div>
    );
}
