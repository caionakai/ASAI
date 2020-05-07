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


import {URL} from '../../Variables.jsx'
import axios from 'axios';


class CandidatesClass extends React.Component{

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
        <a href="newcandidate"><Button bsStyle="success">New Candidate</Button></a><p></p>
        <BootstrapTable keyField='id' data={ this.state.candidates } columns={ columns }
        pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />
      </div>
    );
  }
}

function rankFormatter(cell, row, rowIndex, formatExtraData) {
     return (
           <div onClick={event =>  window.location.href='/recruit/newinterview/' + row.id}
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
  dataField: "edit",
  text: "Interview",
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

export default function Candidates() {
    const classes = useStyles();




    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Candidates'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <CandidatesClass />

          </main>
        </div>
    );
}
