import React, {useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

import { Grid, Paper, Divider, Box, IconButton, OutlinedInput, Snackbar, Typography   } from '@material-ui/core'
import { InputAdornment, FormControl, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText  } from '@material-ui/core';
import FadeIn from 'react-fade-in';
import CustomGrid from './CustomGrid.js';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
})

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
    textFieldColor: {
      backgroundColor: '#ffffff'
    },
    buttonNewSale: {
      backgroundColor: '#4BB543',
      color: '#ffffff',
      '&:hover' : {
        backgroundColor: '#4BB000',
      }
    },
    buttonClearCart: {
      backgroundColor: '#c2c2c2',
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
    },
    snackSucess: {
      backgroundColor: '#4BB543',
    },
    snackError: {
      backgroundColor: '#ff4545',
    },
    snackUpdate: {
      backgroundColor: '#a3a30d',
    },
    snackDefault: {
      backgroundColor: '#a3a3a3',
    }
  }));

export default function Sales() {
    const history = useHistory();
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);

    const  [userSelected, setuserSelected] = useState(null);
    const  [vendorSelected, setVendorSelected] = useState(null);
    const  [productSelected, setproductSelected] = useState(null);
    const  [valores, setValores] = React.useState({
      quantidade: 0
    });

    const [snackMsg, setSnackMsg] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
      type: classes.snackSucess,
      msg: ''
    });
    
    const [confirmDialog, setConfirmDialog] = useState(false);
    
    const { vertical, horizontal, open } = snackMsg;

    const addItem = (item) => {
      setCarrinho([
        ...carrinho,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: valores.quantidade,
        }
      ])};

    const [carrinho, setCarrinho] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);

    const [userRows,setUserRows] = useState([]);
    const [vendorRows,setVendorRows] = useState([]);
    const [productRows,setProductRows] = useState([]);
    const [reload,setReaload] = useState(0);

    const [discount, setDiscount] = useState(0);

    async function getUserRowsFromAPI() {
      if (userRows.length == 0) {
        try {
          const data = await api.get('/crm/clients', {timeout: 5000});
          console.log("Usuarios encontrados:",data);
          setUserRows(data.data);
          if(data.data == "") {
            console.log("Recebeu lista de usuários vazia. Tentando novamente...");
            return getUserRowsFromAPI();
          }
          return ;
        } catch(error) {
            console.log("Erro ao obter API Usuarios. Tentando novamente...");
            return getUserRowsFromAPI();
        };
      }
      return;
    }

    async function getVendorRowsFromAPI() {
      if (userRows.length == 0) {
        try {
          const data = await api.get('/erp/employee', {timeout: 5000});
          console.log("Vendedores encontrados:",data);
          setVendorRows(data.data);
          if(data.data == "") {
            console.log("Recebeu lista de vendedores vazia. Tentando novamente...");
            return getVendorRowsFromAPI();
          }
          return ;
        } catch(error) {
            console.log("Erro ao obter API Vendedores. Tentando novamente...");
            return getVendorRowsFromAPI();
        };
      }
      return;
    }

    async function getProductRowsFromAPI() {
      if (productRows.length == 0) {
        try {
          const data = await api.get('/erp/product', {timeout: 5000});
          console.log("Produtos encontrados:",data);
          setProductRows(data.data);
          if(data.data == "") {
            console.log("Recebeu lista de produtos vazia. Tentando novamente...");
            return getProductRowsFromAPI();
          }
          return ;
        } catch(error) {
            console.log("Erro ao obter API Produtos. Tentando novamente...");
            return getProductRowsFromAPI();
        };
      }
      return;
    }
    
    useEffect(() => {
      
      getUserRowsFromAPI();

      getProductRowsFromAPI();

      getVendorRowsFromAPI();
      /*api.get('sales/products').then(response => {
        setProductRows(response.data.productRows);
      })*/
    }, [reload]);
  
    const handleChange = (prop) => (event) => {
      setValores({ ...valores, [prop]: event.target.value });
    };
  
    function handleClick(data) {
      return setuserSelected(data);
    }

    function handleClickVendor(data) {
      return setVendorSelected(data);
    }

    //const [sellerID,setSellerID] = useState(1);
  
    const userColumns = [
      { key: 'id', name: 'ID', width: 60},
      { key: 'name', name: 'Name' },
      { key: 'email', name: 'Email' },
      { key: 'select', name: 'Select',width: 60},
    ];

    const vendorCols = [
      { key: 'id', name: 'ID', width: 60},
      { key: 'name', name: 'Name' },
      { key: 'nif', name: 'NIF' },
      { key: 'select', name: 'Select',width: 60},
    ];
  
  
    const productColumns = [
      { key: 'id', name: 'ID', width: 50},
      { key: 'name', name: 'Nome' },
      { key: 'price', name: 'Preço' },
      { key: 'quantity', name: 'Quantidade'},
      { key: 'select', name: 'Select',width: 60},
    ];
  
    function insertNewProduct(data) {
      //setproductSelected(null);
      if (!parseInt(valores.quantidade) || valores.quantidade.includes('.') || valores.quantidade.includes(',') ) {
        setSnackMsg({ ...snackMsg, msg: 'A entrada deve ser um número inteiro positivo!', type: classes.snackError, open: true })
      } else if (data.quantity < valores.quantidade) {
        setSnackMsg({ ...snackMsg, msg: 'A quantidade inserida não pode ser maior que seu estoque!', type: classes.snackError, open: true })
      } else if (valores.quantidade <= 0) {
        setSnackMsg({ ...snackMsg, msg: 'A quantidade inserida não pode ser menor ou igual a zero', type: classes.snackError, open: true })
      } else {

        let exists = carrinho.findIndex(element => element.id === data.id);
        if (exists === -1) {
          addItem(data);
          setValores({quantidade: 0});
          setSnackMsg({ ...snackMsg, msg: 'Produto inserido no carrinho!', type: classes.snackSucess, open: true })
        } else {
          carrinho[exists] = {
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: valores.quantidade,
          };
          setValores({quantidade: 0});
          setSnackMsg({ ...snackMsg, msg: 'Produto atualizado no carrinho!', type: classes.snackUpdate, open: true })
        }
      }
    }

    function removeProduct(data) {
      let existsID = carrinho.findIndex(element => element.id === data.id);
      if (existsID !== -1) {
        setCarrinho(carrinho.filter(item => { return item.id !== data.id } ));
      }
    }

    function clearCarrinho() {
      setCarrinho([]);
      setConfirmDialog(false);
    }

    async function sendNewSaleId(saleID, item) {
      try {
        const data = {
          quantity: item.quantity,
          price: item.price,
          sale_id: saleID,
          product_id: item.id,
        }
        const response = await api.post('/erp/saleItem', data);
        console.log("SaleItem Registred: ",response);
        return ;
      } catch (err) {
        console.log("Erro Cadastrar SaleItem ("+item.name+"). Tentando novamente...");
        return sendNewSaleId(saleID, item);
      }
    }

    async function sendNewSale(e) {
      setIsLoading(true);
      e.preventDefault();
      try {
        const data = {
          purchase_date: new Date(),
          client_id: userSelected.id,
          discount_percentage: parseInt(discount),
          seller_id: vendorSelected.id,
        }
        const response = await api.post('/erp/sale', data);
        console.log("Sale Registred: ",response);

        
        const result = await Promise.all(carrinho.map(item => {
          return sendNewSaleId(response.data.id, item);
        }));

        alert("Venda Cadastrada com Sucesso!");
        return window.location.reload(); 

      } catch (err) {
        console.log("Erro Cadastrar Sale. Tentando novamente...");
        return sendNewSale(e);
      }
    }

    return (
      <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Sales'}/>
          <Sidebar currentPage={3} />
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
                                    <Typography variant="body1" className={classes.paperHeaderText}>{userSelected.id}</Typography>
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
                          : <Box m={2} pb={2}>
                            { userRows && userRows.length
                              ? <FadeIn>
                                <CustomGrid columns={userColumns} rows={userRows} handleClick={handleClick} />
                                </FadeIn>
                              : <Skeleton variant="rect" width={300} height={250} style={{backgroundColor: '#949292'}}/>
                            }
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
                        { productRows && productRows.length
                          ? <CustomGrid columns={productColumns} rows={productRows} handleClick={setproductSelected} />
                          : <Skeleton variant="rect" animation="wave" width={400} height={250} style={{backgroundColor: '#949292'}}/>
                        }
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
                                <Button
                                  variant="contained"
                                  size="large"
                                  onClick={() => insertNewProduct(productSelected)}
                                  disabled={valores.quantidade == 0 ? true : false}
                                  startIcon={<AddShoppingCartIcon />}>
                                  ADD
                                </Button>
                                </Grid>
                              </Grid>
                            </Paper>
                            </FadeIn>
                          : null }
                        </Box>
                  </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={2} className={classes.paperCard}>
                        <div className={classes.paperHeader}>
                            <Box p={1}>
                                <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Employee Selection</Typography>
                            </Box>
                        </div>
                        <Divider variant={"middle"} />                          
                        {!!vendorSelected 
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
                                    <Typography variant="h5" className={classes.paperHeaderText}>{vendorSelected.name}</Typography>
                                    <Typography variant="body1" className={classes.paperHeaderText}>{vendorSelected.id}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                  <IconButton className={classes.removeButton} onClick={() => setVendorSelected(null)}>
                                    <HighlightOffRoundedIcon className={classes.removeIcon} fontSize={'large'}/>
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Paper> 
                          </FadeIn>)
                          : <Box m={2} pb={2}>
                            { vendorRows && vendorRows.length
                              ? <FadeIn>
                                <CustomGrid columns={vendorCols} rows={vendorRows} handleClick={handleClickVendor} />
                                </FadeIn>
                              : <Skeleton variant="rect" width={300} height={250} style={{backgroundColor: '#949292'}}/>
                            }
                        </Box>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={7}>
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
                      
                      <Grid item key={item.id}>
                        <Box mt={2}>
                      <FadeIn>
                        <Paper className={classes.paperCard2} elevation={2}>
                          <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                            <Grid item>
                            <IconButton onClick={() => removeProduct(item)} ><DeleteForeverOutlinedIcon className={classes.removeIcon2}/></IconButton>
                            </Grid>
                              <Divider orientation={'vertical'} flexItem={true} />
                            <Grid item>
                            <Typography variant="body1" className={classes.paperHeaderText}>{item.name}</Typography>
                            <Typography variant="body1" className={classes.paperHeaderText}>Quant: {item.quantity}</Typography>
                            <Typography variant="body1" className={classes.paperHeaderText}>Unit Price: € {item.price}</Typography>
                            </Grid>
                              <Divider orientation={'vertical'} flexItem={true} />
                            <Grid item>
                              <Box mr={1}>
                              <Typography variant="h6" className={classes.paperHeaderText}>€ {(item.price*item.quantity).toFixed(2)}</Typography>
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
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  key={`${vertical},${horizontal}`}
                  open={open}
                  ContentProps={{
                    classes: {
                        root: snackMsg.type
                    }
                }}
                  onClose={() => setSnackMsg({ ...snackMsg, open: false })}
                  message={snackMsg.msg}
              />
            </Grid>

            <Grid container justify="flex-end" alignItems="center">
            <Box mt={2} mr={1}>
            <Typography> Discount: </Typography>
            </Box>
            <Box mt={2} mr={1}>
            <OutlinedInput 
              id="standard-adornment-weight"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              size={'small'}
              style={{maxWidth: '100px'}}
              className={classes.textFieldColor}
              type="number"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            </Box>
            <Box mt={2} mr={1}>
            <Button size="large" onClick={() => setConfirmDialog(true)} className={classes.buttonClearCart}>Clear Cart</Button>
            </Box>
            <Box mt={2} ml={1}>
            <Button size="large" onClick={sendNewSale} disabled={isLoading} className={classes.buttonNewSale}>Confirm Sale</Button>
            </Box>
            </Grid>

          <Dialog
            open={confirmDialog}
            onClose={() => setConfirmDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Do you want to clear the shopping cart?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Confirm this action by clicking on Confirm Button.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={clearCarrinho} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          </main>
        </div>
    );
}