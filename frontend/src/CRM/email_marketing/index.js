import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomGrid from './CustomGrid.js';
import { Skeleton } from '@material-ui/lab';
import FadeIn from 'react-fade-in';

import {
    Grid, Paper, Divider,  Box, Button, Radio, RadioGroup, FormControl, FormControlLabel,
    TextField, IconButton
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Typography from '@material-ui/core/Typography';
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
        backgroundColor: '#FFFFFF'
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
    button: {
        marginTop: theme.spacing(1),
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: 'black',
        }
    },
    paperCard2: {
        backgroundColor: '#1972B3'
    },
}));

export default function EM() {
    const classes = useStyles();

    const [selectedValue, setSelectedValue] = useState('everyone');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [productSelected, setproductSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [productRows, setProductRows] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [reload, setReload] = useState(0);
    const [valores, setValores] = React.useState({
        quantidade: 0
    });

    const productColumns = [
        { key: 'id', name: 'ID', width: 50 },
        { key: 'name', name: 'Nome' },
        { key: 'price', name: 'Preço' },
        { key: 'quantity', name: 'Quantidade' },
        { key: 'select', name: 'Select', width: 60 },
    ];

    const [snackMsg, setSnackMsg] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        type: classes.snackSucess,
        msg: ''
    });



    useEffect(() => {

        getProductRowsFromAPI();
        /*api.get('sales/products').then(response => {
          setProductRows(response.data.productRows);
        })*/
    }, [reload]);

    const addItem = (item) => {
        setCarrinho([
            ...carrinho,
            {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: valores.quantidade,
            }
        ])
    };

    const handleChange =  (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
    };

    function removeProduct(data) {
        let existsID = carrinho.findIndex(element => element.id === data.id);
        if (existsID !== -1) {
            setCarrinho(carrinho.filter(item => { return item.id !== data.id }));
        }
    }

    function insertNewProduct(data) {
        //setproductSelected(null);
        let exists = carrinho.findIndex(element => element.id === data.id);
        if (exists === -1) {
            addItem(data);
            setValores({ quantidade: 0 });
            setSnackMsg({ ...snackMsg, msg: 'Produto inserido no carrinho!', type: classes.snackSucess, open: true })
        } else {
            carrinho[exists] = {
                id: data.id,
                name: data.name,
                price: data.price,
                quantity: valores.quantidade,
            };
            setValores({ quantidade: 0 });
            setSnackMsg({ ...snackMsg, msg: 'Produto atualizado no carrinho!', type: classes.snackUpdate, open: true })
        }
    }


    async function getProductRowsFromAPI() {
        if (productRows.length == 0) {
            try {
                const data = await api.get('/erp/product', { timeout: 5000 });
                console.log("Produtos encontrados:", data);
                setProductRows(data.data);
                return;
            } catch (error) {
                console.log("Erro ao obter API Produtos. Tentando novamente...");
                return getProductRowsFromAPI();
            };
        }
        return;
    }

    async function sendNewEmailId(emailID, item) {
        try {
          const data = {
            email_id: emailID,
            product_id: item.id,
          }
          const response = await api.post('/crm/email_product', data);
          console.log("emailProduct Registred: ", response);
          return;
        } catch (err) {
          console.log("Erro Cadastrar EmailProduct (" + item.name + "). Tentando novamente...");
          return sendNewEmailId(emailID, item);
        }
      }

    async function sendNewEmail(e) {
        setIsLoading(true);
        e.preventDefault();
        try {
            const data = {
                mail_date: new Date(),
                receiver: selectedValue,
                subject: subject,
                text: text,
            }
            console.log(data);
            const response = await api.post('/crm/email_marketing', data);
            console.log("Email Registred: ", response);


            const result = await Promise.all(carrinho.map(item => {
                return sendNewEmailId(response.data.id, item);
            }));

            alert("Email enviado com Sucesso!");
            return window.location.reload();

        } catch (err) {
            console.log("Erro cadastrar email. Tentando novamente...");
            console.log(err)
            return sendNewEmail(e);
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar pageTitle={'Email Marketing'} />
            <Sidebar currentPage={15} />
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Paper elevation={2} className={classes.paperCard}>
                                    <Box borderRadius={4} className={classes.paperHeader} p={1}>
                                        <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Recipients</Typography>
                                    </Box>
                                    <Box p={2}>
                                        <Grid container spacing={3}>
                                            <Grid item>
                                                <FormControl component="fieldset" fullWidth>
                                                    <RadioGroup defaultValue="everyone" aria-label="sendto" name="sendto" onChange={handleChange}>
                                                        <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                                                        <FormControlLabel value="employees" control={<Radio />} label="Employees" />
                                                        <FormControlLabel value="customers" control={<Radio />} label="Customers" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper elevation={2} className={classes.paperCard}>
                                    <Box borderRadius={4} className={classes.paperHeader} p={1}>
                                        <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>E-mail</Typography>
                                    </Box>
                                    <Box p={2}>
                                        <div>
                                            <TextField
                                                required
                                                fullWidth
                                                id="subject-text"
                                                label="Subject"
                                                variant="filled"
                                                onChange={e => setSubject(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                required
                                                fullWidth
                                                multiline
                                                rows={15}
                                                rowsMax={30}
                                                id="content-text"
                                                label="Content"
                                                variant="outlined"
                                                onChange={e => setText(e.target.value)}
                                                className={classes.emailBody}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                endIcon={<SendIcon />}
                                                onClick={sendNewEmail}
                                            >Send</Button>

                                        </div>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container direction="column" >
                            <Grid item>
                                <Paper elevation={2} className={classes.paperCard}>
                                    <Box borderRadius={4} className={classes.paperHeader} p={1} >
                                        <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Product Selection</Typography>
                                    </Box>
                                    <Divider variant={"middle"} />
                                    <Box m={2}>
                                        {productRows && productRows.length
                                            ? <CustomGrid columns={productColumns} rows={productRows} handleClick={setproductSelected} />
                                            : <Skeleton variant="rect" animation="wave" width={400} height={250} style={{ backgroundColor: '#949292' }} />
                                        }
                                    </Box>
                                    <Box m={2} pb={1}>
                                        {!!productSelected
                                            ? (
                                                insertNewProduct(productSelected),
                                                setproductSelected(null))
                                            : null}
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper elevation={2} className={classes.paperCard}>
                                    <Box borderRadius={4} className={classes.paperHeader} p={1}>
                                        <Typography variant={'h5'} align='center' className={classes.paperHeaderText}>Marketing Products</Typography>
                                    </Box>
                                    <Divider variant={"middle"} />
                                    <Box p={2}>
                                        <Grid container direction="row" spacing={2}>
                                            {carrinho.map(item => (

                                                <Grid item key={item.id}>
                                                    <Box mt={2}>
                                                        <FadeIn>
                                                            <Paper className={classes.paperCard2} elevation={2}>
                                                                <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                                                                    <Grid item >
                                                                        <IconButton onClick={() => removeProduct(item)} ><DeleteForeverOutlinedIcon className={classes.removeIcon2} /></IconButton>
                                                                    </Grid>
                                                                    <Divider orientation={'vertical'} flexItem={true} />
                                                                    <Grid item style={{ marginRight: '8px' }}>
                                                                        <Typography variant="body1" className={classes.paperHeaderText}>{item.name}</Typography>
                                                                        <Typography variant="body1" className={classes.paperHeaderText}>Price: € {item.price}</Typography>
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
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}