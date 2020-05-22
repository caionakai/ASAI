import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import axios from 'axios';
import { Button } from 'react-bootstrap';


const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const columns = [

  {
    dataField: 'product_name',
    sort: true,
    headerSortingStyle,
    text: 'Product name',
    filter: textFilter(),
  },
  {
    dataField: 'photo_likes',
    sort: true,
    headerSortingStyle,
    text: 'Likes',
  },
  {
    dataField: 'photo_comments',
    sort: true,
    headerSortingStyle,
    text: 'Comments',
  },
  {
    dataField: 'word',
    text: 'Keywords (tag)',
    filter: textFilter(),
    },
  {
    dataField: 'photo_id',
    text: '',
    formatter: colFormatter,
  },

];

const defaultSorted = [
  {
    dataField: "name",
    order: "asc"
  }
];



function colFormatter(cell, row) {
    let link = `${cell}`
  return (
      <a href={'/sm/product/' + link}><Button bsStyle="success" fill>Details</Button></a>
  )
}




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
    
    useEffect(() => {
      try {
        api.get('crm/photokeyword', {}).then(response => {
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

/* Temp code




*/