import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});





const table = [
  {
  dataField: 'Brand_name',
  text: 'Product Brands ',
  sort: true,
  filter: textFilter()
  },
  {
  dataField: 'quantity',
  text: 'Quantity in Store',
  sort: true
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
      padding: theme.spacing(10),
    },
  }));


export default function ProductsBrands() {
    const classes = useStyles();

    const [brands, setBrands] = useState([]);
    
    useEffect(() => {
      try {
        api.get('erp/stock', {}).then(response => {
          if (response.data !== '') {
            setBrands(response.data);
          }
        })
      } catch (err) {
        console.log('Error on getting products')
      }
    }, [])




    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Inventory Per Brand'}/>
          <Sidebar currentPage={2} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Link to={"/inventory"}><Button bsStyle="dark" size='lg'>Go back</Button></Link>
            <p></p>
            <BootstrapTable keyField='id' data={ brands } columns={ table }
            pagination={ paginationFactory() } filter={ filterFactory() }  />
            
          </main>
        </div>
    );
}
