import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { Button } from 'react-bootstrap';
import Input from './components/form/Input';  
import TextArea from './components/form/TextArea';  
import Select from './components/form/Select';
import {URL} from '../../Variables.jsx'
import axios from 'axios';
import './leads.css';


const classes = makeStyles((theme) => ({
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

 class NewLead extends React.Component {  
    constructor(props) {
      super(props);

      this.state = {
        newLeads: [],

        newLead: {
          lead: '',
          company: '',
          person: '',
          age: '',
          gender: '',
          phone: '',
          description: ''
        },
  
        genderOptions: ['Male', 'Female'],
  
      }
      this.handleInput = this.handleInput.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
    }
    
    handleInput(e) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState( prevState => ({ newLead : 
      {...prevState.newLead, [name]: value}}))
    }
  
    handleClearForm() {
        this.setState({ 
          newLead: {
            lead: '',
            company: '',
            person: '',
            age: '',
            gender: '',
            phone: '',
            description: ''
          },
        })
    }

    setData() {
      if (this.state.newLead.lead == '' || this.state.newLead.company == '')
          {alert('Lead name and Copmany name fields are obligatory to fill')}
      else { 
          let newLead = { 
            lead: this.state.newLead.lead,
            company: this.state.newLead.company,
            person: this.state.newLead.person,
            age: this.state.newLead.age,
            gender: this.state.newLead.gender,
            phone: this.state.newLead.phone,
            description: this.state.newLead.description
          }
          localStorage.setItem('myData', JSON.stringify(newLead));

          alert('The form was submit with Success')
          this.handleClearForm()
      }
    }


    A() {
          axios.post( URL + '/crm/lead', {
            lead: this.state.newLead.lead,
            company: this.state.newLead.company,
            person: this.state.newLead.person,
            age: this.state.newLead.age,
            gender: this.state.newLead.gender,
            phone: this.state.newLead.phone,
            description: this.state.newLead.description
          })
          .then(response => {
            console.log('success')
          })
          .catch(error => {
            console.log('error', error);
          });  
    }


    render() {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'AddLead'}/>
          <Sidebar currentPage={9} />
          <main className='leads'>
            <div className={classes.toolbar} />
                <Input inputType={'text'}
                        title= {'Lead Name'} 
                        name= {'lead'}
                        value={this.state.newLead.lead} 
                        placeholder = {'* Lead Name'}
                        handleChange = {this.handleInput}
                /> 
                <Input inputType={'text'}
                        title= {'Company Name'} 
                        name= {'company'}
                        value={this.state.newLead.company} 
                        placeholder = {'* Company Name'}
                        handleChange = {this.handleInput}
                />          
                <Input inputType={'text'}
                        title= {'Person Name'} 
                        name= {'person'}
                        value={this.state.newLead.person} 
                        placeholder = {'Person Name'}
                        handleChange = {this.handleInput}
                />          
                <Input inputType={'number'} 
                        title= {'Age'} 
                        name={'age'}
                        value={this.state.newLead.age} 
                        placeholder = {'Age'}
                        handleChange={this.handleInput} 
                /> 
                <Select title={'Gender'}
                        name={'gender'}
                        options = {this.state.genderOptions} 
                        value = {this.state.newLead.gender}
                        placeholder = {'Gender'}
                        handleChange = {this.handleInput}
                /> 
                <Input inputType={'number'} 
                        title= {'Phone'} 
                        name={'phone'}
                        value={this.state.newLead.phone} 
                        placeholder = {'Phone'}
                        handleChange={this.handleInput} 
                /> 
                <TextArea title={'Description'}
                          rows={5}
                          value={this.state.newLead.description}
                          name={'description'}
                          handleChange={this.handleInput}
                          placeholder={'Description'} 
                />
                <Button bsStyle="primary" style={buttonStyle}
                  onClick={ () => this.A() }> Try
                </Button>

                <Button bsStyle="secondary" style={buttonStyle}
                    href="/leads"> «-- Back
                </Button>

                <Button bsStyle="primary" style={buttonStyle}
                  onClick={ () => this.setData() }> Add +
                </Button>

                <Button bsStyle="secondary" style={buttonStyle}
                  onClick={ () => this.handleClearForm() }> Clear
                </Button>

                <h5 style={writeStyle}> * obligatory fields </h5>              
          </main>
        </div>    
      );
    }
  }
  const buttonStyle = {
    margin : '10px 10px 10px 10px'
  }
  const writeStyle = {
    color: 'red'
  }
  
  export default NewLead;