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
            List contacts
          </div>
        </div>
      </main>
    </div>
  );
}