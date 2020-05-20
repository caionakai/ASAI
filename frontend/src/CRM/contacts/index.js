import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import './styles.css'
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

  palette: {
    primary: blue,
    secndary: green,
  }
}));


export default function Contacts() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredComunicationMethod, setPreferredComunicationMethod] = useState('');
  const [selectedClient, setSelectedClient] = useState({});
  const [clients, setClients] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [buttonColor, setButtonColor] = useState('primary');

  useEffect(() => {
    try {
      api.get('crm/clients/', {}).then(response => {
        if (response.data !== '') {
          setClients(response.data);
        }
      })
    } catch (err) {
      console.log('Error on get users list')
    }


  }, [])

  const handleChange = (event) => {
    setPreferredComunicationMethod(event.target.value);
  };

  async function handleCreate(e) {
    e.preventDefault();

    const data = {
      name,
      address,
      phone,
      email,
      preferredComunicationMethod
    }

    if (isEdit === true) {
      try {
        const res = await api.put(`crm/clients/${selectedClient.id}`, data);
        console.log('success', res);

        clients.forEach(client => {
          if (client.id === selectedClient.id) {
            console.log('achei');
            client.name = name;
            client.address = address;
            client.phone = phone;
            client.email = email;
            client.preferredComunicationMethod = preferredComunicationMethod
          }
        });

        setClients([...clients]);
      } catch (err) {
        alert('Error on register user, try again ...', err);
      }
    } else {
      try {
        const res = await api.post('crm/clients/', data);
        console.log('success', res);

        setClients([...clients, res.data]);
      } catch (err) {
        alert('Error on register user, try again ...', err);
      }
    }
    handleClean();
  }

  function handleEdit(user) {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setPreferredComunicationMethod(user.preferredComunicationMethod);

    setSelectedClient(user);
    setIsEdit(true);
    setButtonColor('inherit');

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;  // For chrome
  }


  async function handleDelete(user) {
    try {

      const res = await api.delete(`crm/clients/${user.id}`);

      if (res) {
        const clientsIndex = clients.findIndex(client => client.id === user.id);
        clients.splice(clientsIndex, 1);
        setClients([...clients]);
      }
    } catch (err) {
      console.log('Error in delete of user', err);
    }
  }

  function handleClean() {
    setButtonColor('primary');
    setIsEdit(false);
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
    setPreferredComunicationMethod('');
  }




  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar pageTitle={'Contacts'} />
      <Sidebar currentPage={8} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className='main-contacts'>
          <div className="register">
            <div className="register-title">
              <span>Register Form</span>
              <p>Put the client informations here</p>
            </div>
            <div className="input-group">
              <form className="register-form" action="" onSubmit={handleCreate}>
                <div className="register-item">
                  <TextField
                    // required
                    id="standard-required"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="register-item">
                  <TextField
                    // required
                    id="standard-required"
                    label="Address"
                    variant="filled"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="register-item">
                  <TextField
                    // required
                    id="standard-required"
                    label="Phone"
                    variant="filled"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="register-item">
                  <TextField
                    // required
                    id="standard-required"
                    label="E-mail"
                    variant="filled"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="associateds">
                  <div className="register-select">
                    <span>Select a communication method:</span>
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-filled-label">Method</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={preferredComunicationMethod}
                        onChange={handleChange}

                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'phone'}>Phone</MenuItem>
                        <MenuItem value={'email'}>E-mail</MenuItem>
                        <MenuItem value={'mail'}>Mail</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="register-item register-actions">
                  <Button variant="contained" color={buttonColor} type="submit">
                    {isEdit === false && 'Register'}
                    {isEdit === true && 'Update'}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleClean}>Clean</Button>
                </div>
              </form>
            </div>
          </div>

          <div className="list">
            <div className="table-text">
              <h2>Manage here the Clients!</h2>
            </div>

            <div className="table-container">
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Phone</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">preferredComunicationMethod</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell align="center">{client.name}</TableCell>
                        <TableCell align="center">{client.address}</TableCell>
                        <TableCell align="center">{client.phone}</TableCell>
                        <TableCell align="center">{client.email}</TableCell>
                        <TableCell align="center">{client.preferredComunicationMethod}</TableCell>
                        <TableCell><button className="table-button green-button" onClick={() => handleEdit(client)}><EditIcon></EditIcon></button></TableCell>
                        <TableCell><button className="table-button red-button" onClick={() => handleDelete(client)}><DeleteForeverIcon></DeleteForeverIcon></button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}