import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import AddIcon from '@material-ui/icons/Add';

import {URL} from '../../Variables.jsx'
import axios from 'axios';


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

  class HireClass extends React.Component{

    constructor(props) {
              super(props);
              this.state = { candidates: [] };
      }

      componentWillMount() {
              axios.get( URL + '/erp/candidate/')
              .then(response => {
                this.setState({ candidates: response.data });
              })
              .catch(function (error) {
                console.log(error);
              })
          }

    render(){
      return(
        <div className="content">
          <BootstrapTable keyField='id' data={ this.state.candidates } columns={ columns }
          pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />
        </div>
      );
    }
  }

export default function Hire() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Recommended candidates'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <HireClass />

          </main>
        </div>
    );
}
