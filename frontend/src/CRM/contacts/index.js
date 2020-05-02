import React, { useState } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
    primary: blue
  }
}));


export default function Contacts() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredCommunication, setPreferredCommunication] = useState('');
  const [isAssociated, setAssociated] = useState('True');

  const clients = [
    { name: "Fulano de Tal", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Ta2", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "email", isAssociated: "False" },
    { name: "Fulano de Ta3", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Ta4", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Tal5", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Tal6", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Tal7", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Tal8", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },
    { name: "Fulano de Tal9", address: "street croconaw", phone: "123456789", email: "Crocodile@gmail.com", preferredCommunication: "phone", isAssociated: "True" },

  ];

  const handleChange = (event) => {
    setPreferredCommunication(event.target.value);
  };

  async function handleCreate(e) {
    e.preventDefault();
    console.log('nome: ', name, '\nAddress: ', address, '\nphone: ', phone, '\nemail: ', email, '\npreferred: ', preferredCommunication, '\nisAssociated:', isAssociated)
  }

  function handleClean() {
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
    setPreferredCommunication('');
    setAssociated('True');
  }

  function handleEdit(user) {
    console.log("Editing User", user);
    setName(user.name);
    setPhone(user.phone);
    setAddress(user.address);
    setEmail(user.email);
    setPreferredCommunication(user.preferredCommunication);
    setAssociated(user.isAssociated);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;  // For chrome
  }

  function handleDelete(user) {
    console.log("Deleting User", user);
    // rows =  rows.filter((row) => row.name !== user.name);
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
                  <div className="radio-group">
                    <span>Is associated?</span>
                    <RadioGroup row aria-label="isAssociated" name="isAssociated" value={isAssociated} onChange={e => setAssociated(e.target.value)}>
                      <FormControlLabel value='True' control={<Radio />} label="Yes" labelPlacement="bottom" />
                      <FormControlLabel value='False' control={<Radio />} label="No" labelPlacement="bottom" />
                    </RadioGroup>
                  </div>
                  <div className="register-select">
                    <span>Select a communication method:</span>
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-filled-label">Method</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={preferredCommunication}
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
                  <Button variant="contained" color="primary" type="submit">
                    Register
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
                      <TableCell align="center">preferredCommunication</TableCell>
                      <TableCell align="center">isAssociated</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.name}>
                        <TableCell align="center">{client.name}</TableCell>
                        <TableCell align="center">{client.address}</TableCell>
                        <TableCell align="center">{client.phone}</TableCell>
                        <TableCell align="center">{client.email}</TableCell>
                        <TableCell align="center">{client.preferredCommunication}</TableCell>
                        <TableCell align="center">{client.isAssociated}</TableCell>
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