import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SideB from '../SideB';
import TopB from '../TopB';
import CustomTable from './customTable'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { Grid, Paper, Divider, Input, Box, Button, IconButton, OutlinedInput   } from '@material-ui/core'
import { FormLabel, InputAdornment, FormControl  } from '@material-ui/core';
import CustomGrid from '../CustomGrid';
import { render } from 'react-dom';

import FadeIn from 'react-fade-in';

import { CSSTransition, TransitionGroup } from "react-transition-group";

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
  paperCard: {
    backgroundColor: '#f5f5f5'
  },
  paperCard2: {
    backgroundColor: '#1972B3'
  },
  paperHeader: {
      backgroundColor: '#353535'
  },
  paperHeaderText: {
      color: '#ffffff'
  },
  buttonForm: {
    background: '#1D1D1D',
    borderRadius: '8px',
    color: '#ffffff'
  },
  textFieldColor: {
    backgroundColor: '#ffffff'
  },
  customButton: {
    backgroundColor: '#ffffff',
    color: '#000000',
    '&:hover' : {
      backgroundColor: '#d4d4d4',
    }
  },
  removeIcon: {
    color: '#6e0000'
  },
  removeIcon2: {
    color: '#00065c'
  }
}));

export default function SalesNew() {
  const classes = useStyles();
  const  [userSelected, setuserSelected] = useState(null);
  const  [productSelected, setproductSelected] = useState(null);
  const  [valores, setValores] = React.useState({
    quantidade: 0
  });

  const [carrinho, setCarrinho] = useState([]);

  const addItem = (item) => {
    setCarrinho([
      ...carrinho,
      {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }
    ])};

  const handleChange = (prop) => (event) => {
    setValores({ ...valores, [prop]: event.target.value });
  };

  function handleClick(data) {
    return setuserSelected(data);
  }

  const userColumns = [
    { key: 'id', name: 'ID', width: 60},
    { key: 'name', name: 'Name' },
    { key: 'nif', name: 'NIF' },
    { key: 'select', name: 'Select',width: 60},
  ];

  const userRows = [
    {id: 0, name: 'Ros Main', nif: '5599595741', select: '' },
    {id: 1, name: 'Calvin Malk', nif: '3213211321', select: ''},
    {id: 2, name: 'Wester Park', nif: '1235434351', select: ''},
    {id: 3, name: 'Filer Ispor', nif: '7654677655', select: ''},
    {id: 4, name: 'Catrine Bors', nif: '989066790', select: ''},
  ];

  const productColumns = [
    { key: 'id', name: 'ID', width: 50},
    { key: 'name', name: 'Nome' },
    { key: 'price', name: 'Preço' },
    { key: 'quantity', name: 'Quantidade'},
    { key: 'select', name: 'Select',width: 60},
  ];

  const productRows = [
    {id: 0, name: 'Raglan P', price: 59, quantity: 8, select: '' },
    {id: 1, name: 'Camiseta Dark M', price: 32, quantity: 12, select: '' },
    {id: 2, name: 'Sueter Rose Estelar', price: 123, quantity: 35, select: '' },
    {id: 3, name: 'Calça Jeans Onimso P', price: 75.4, quantity: 22, select: '' },
    {id: 4, name: 'Camisa Polo Xadrez GG', price: 99.98, quantity: 4, select: '' },
  ];

  function insertNewProduct(data) {
    //setproductSelected(null);
    setValores({quantidade: 0});
    addItem(data);
    //setproductSelected({...productSelected, name: ''})
  }

  
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopB pageTitle={'SALES'} pageRoute={1} />
      <SideB currentPage={3} />
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <Paper elevation={2} className={classes.paperCard}>
                        <div className={classes.paperHeader}>
                            <Box p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Client Selection</Typography>
                            </Box>
                        </div>
                        <Divider variant={"middle"} />                          
                        {!!userSelected 
                          ? (
                        <FadeIn>
                            <Paper elevation={1} className={classes.paperCard2}>
                              <Grid
                                container
                                direction={'row'}
                                alignItems={'center'}
                              >
                                <Grid item xs={2}>
                                <Grid container justify={'center'}><AccountCircleOutlinedIcon className={classes.paperHeaderText} fontSize={'large'}/></Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box p={1}>
                                    <Typography variant="h5" className={classes.paperHeaderText}>{userSelected.name}</Typography>
                                    <Typography variant="body1" className={classes.paperHeaderText}>{userSelected.nif}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                  <IconButton className={classes.removeButton} onClick={() => setuserSelected(null)}>
                                    <HighlightOffRoundedIcon className={classes.removeIcon} fontSize={'large'}/>
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Paper> 
                          </FadeIn>)
                          : <Box m={2}><FadeIn>
                          <CustomGrid columns={userColumns} rows={userRows} handleClick={handleClick} /></FadeIn>
                        </Box>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                <Paper elevation={2} className={classes.paperCard}>
                        <div className={classes.paperHeader}>
                            <Box p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Product Selection</Typography>
                            </Box>
                        </div>
                        <Divider variant={"middle"} />
                        <Box m={2}>
                          <CustomGrid columns={productColumns} rows={productRows} handleClick={setproductSelected} />
                        </Box>
                        <Box m={2} pb={1}>
                          {!!productSelected 
                          ? 
                            <FadeIn>
                            <Paper elevation={1} className={classes.paperCard2}>
                              <Grid
                                container
                                direction={'row'}
                                alignItems={'center'}
                                >
                                <Grid item xs={3}>
                                  <Box p={1}>
                                  <FormControl>
                                    <OutlinedInput 
                                      fullWidth={true}
                                      id="standard-adornment-weight"
                                      value={0}
                                      value={valores.quantidade}
                                      onChange={handleChange('quantidade')}
                                      size={'small'}
                                      className={classes.textFieldColor}
                                      endAdornment={<InputAdornment position="end">Unid</InputAdornment>}
                                    />
                                  </FormControl>
                                  </Box>
                                </Grid>
                                <Grid item xs={7}>
                                    <Box p={1} ml={2}>
                                    <Typography variant="h5" className={classes.paperHeaderText}>{productSelected.name}</Typography>
                                    <Typography variant="body1" className={classes.paperHeaderText}>€ {productSelected.price}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>      
                                    <IconButton
                                      variant="contained"
                                      onClick={() => insertNewProduct(productSelected)}
                                      className={classes.customButton}
                                      disabled={valores.quantidade == 0 ? true : false}
                                    ><AddShoppingCartIcon />
                                    </IconButton>
                                </Grid>
                              </Grid>
                            </Paper>
                            </FadeIn>
                          : null }
                        </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper elevation={2} className={classes.paperCard}>
                    <div className={classes.paperHeader}>
                        <Box p={1}>
                            <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Shopping Cart</Typography>
                        </Box>
                    </div>
                    <Divider variant={"middle"} />
                    <Box p={2}>
                    <Grid container direction="row" spacing={2}>
                    {carrinho.map(item => (
                      
                      <Grid item>
                        <Box mt={2}>
                      <FadeIn>
                        <Paper className={classes.paperCard2} elevation={2}>
                        
                          <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                            <Grid item>
                            <IconButton><DeleteForeverOutlinedIcon className={classes.removeIcon2}/></IconButton>
                            </Grid>
                              <Divider orientation={'vertical'} flexItem={true} />
                            <Grid item>
                            <Typography variant="body1" className={classes.paperHeaderText}>{item.name}</Typography>
                            <Typography variant="body1" className={classes.paperHeaderText}>Quant: {item.quantity}</Typography>
                            </Grid>
                              <Divider orientation={'vertical'} flexItem={true} />
                            <Grid item>
                              <Box mr={1}>
                              <Typography variant="h6" className={classes.paperHeaderText}>€ {item.price}</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Paper>
                      </FadeIn>
                      </Box>
                      </Grid>
                    ))}
                    </Grid>
                    </Box>
                    </Paper>
                </Grid>
            </Grid>
        </main>
      </div>
  );
}