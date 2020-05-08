import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


import {URL} from '../../Variables.jsx'
import axios from 'axios';


class ServiceTypesClass extends React.Component{

  constructor(props) {
            super(props);
            this.state = { service_types: [] };
    }

    componentWillMount() {
            axios.get( URL + '/crm/service_types')
            .then(response => {
              this.setState({ service_types: response.data });
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            })
        }
  render(){
    return(
      <div className="content">
        <a href="new_service_type"><Button bsStyle="success">New Service Type</Button></a><p></p>
        <BootstrapTable keyField='id' data={ this.state.service_types } columns={ columns }
        pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />
      </div>
    );
  }
}



const columns = [
  {
  dataField: 'designation',
  text: 'Designation',
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

export default function ServiceTypes() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Service Types'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <ServiceTypesClass />
            
          </main>
        </div>
    );
}
