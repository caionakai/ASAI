import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import axios from 'axios';
import { Link } from 'react-router';


const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const columns = [
  {
    dataField: 'id',
    text: 'Photo id',
    sort: true,
    headerSortingStyle,
    filter: textFilter(),
  },
  {
    dataField: 'page_name',
    sort: true,
    headerSortingStyle,
    text: 'Website',
    filter: textFilter(),
  },
  {
    dataField: 'likes',
    sort: true,
    headerSortingStyle,
    text: 'Likes',
  },
  {
    dataField: 'comments',
    sort: true,
    headerSortingStyle,
    text: 'Comments',
  },

];

const defaultSorted = [
  {
    dataField: "name",
    order: "asc"
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




export default function SM() {
    const classes = useStyles();
    const [photo, setPhoto] = useState([]);
    var answer;

    var lastItem = window.location.pathname.split("/").pop();
    
    
    useEffect(() => {
        try {
            api.get('crm/photo/' + lastItem, {  }).then(response => {
          if (response.data !== '') {
           setPhoto(response.data);
           answer = response.error;
          }
          
        })
        .catch(error => {
          if (error.response) 
          console.log('health check error');
          alert("Could not retrive data from the server. Please refresh the page!")
        });
      } catch (error) {
        console.log('health check error');
        alert("Could not retrive data from the server. /nPlease refresh the page!")
      }
    }, [])
    

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Social Media'}/>
          <Sidebar currentPage={12} />
          <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1> Product {lastItem}</h1>
                
            <BootstrapTable 
              keyField='id'
              data={ photo }
              columns={ columns }
              pagination={ paginationFactory() }
              filter={ filterFactory() }
              defaultSorted={defaultSorted}
              noDataIndication={ <div className="spinner-border fast" role="status"/> }
              filterPosition="top"
              bootstrap4 = {true}
             />

          </main>
        </div>
    );
  
}

