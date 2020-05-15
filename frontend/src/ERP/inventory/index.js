import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Card, CardText, CardTitle, CardBody, CardColumns } from 'reactstrap';
import { Link } from 'react-router-dom';

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

export default function Inventory() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Inventory'}/>
          <Sidebar currentPage={2} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <div className="invent">

                
                <CardColumns>
                  <Link to={"/inventory/products"}>
                  	<Card style={{ width: '35rem' , background: '#1d1d1d', color: 'white'}}>
	                    <CardBody>
	                      <CardTitle><h2>Product</h2></CardTitle>
	                      <CardText>
	                        Search stock per product in warehouse and store
	                      </CardText>
	                    </CardBody>
	                  </Card> 
                  </Link>

                  <Link to={"/inventory/produtCategory"}>
                  	<Card style={{ width: '35rem' , background: '#1d1d1d', color: 'white'}}>
	                    <CardBody>
	                      <CardTitle><h2>Product Category</h2></CardTitle>
	                      <CardText>
	                        Search stock per product category in store store
	                      </CardText>
	                    </CardBody>
	                  </Card> 
                  </Link>

                  <Link to={"/inventory/productBrand"}>
                  	<Card style={{ width: '35rem',  background: '#1d1d1d', color: 'white'}}>
	                    <CardBody>
	                      <CardTitle><h2>Product Brand</h2></CardTitle>
	                      <CardText>
	                        Search stock per brand in store 
	                      </CardText>
	                    </CardBody>
	                  </Card> 
                  </Link>

 

                </CardColumns>

            </div>

          </main>
        </div>
    );
}