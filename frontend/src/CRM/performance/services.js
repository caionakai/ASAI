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


class ServicesClass extends React.Component{

  constructor(props) {
            super(props);
            this.state = { services: [] };
    }

    componentWillMount() {
            axios.get( URL + '/crm/services/')
            .then(response => {
              this.setState({ services: response.data });
            })
            .catch(function (error) {
              console.log(error);
            })
        }

  render(){
    return(
      <div className="content">
        <a href="new_service"><Button bsStyle="success">New Service</Button></a><p></p>
        <BootstrapTable keyField='id' data={ this.state.services } columns={ columns }
        pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />
      </div>
    );
  }
}

function rankFormatter(cell, row, rowIndex, formatExtraData) {
     return (
           <div onClick={event =>  window.location.href='/performance/new_feedback'}
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
    dataField: 'date',
    text: 'Date'
  },
  {
  dataField: "new",
  text: "Feedback",
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

export default function Services() {
    const classes = useStyles();




    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Services'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <ServicesClass />

          </main>
        </div>
    );
}
