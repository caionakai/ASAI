import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { Col } from "react-bootstrap";
import { FormInputs } from "../../Components/FormInputs/FormInputs.jsx";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';

import axios from 'axios';


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

class NewCandidateClass extends React.Component{

  constructor(props)
  {
    super(props)
    this.state = { name: '', email: '', nif: '', address: '',  phone: ''};

     this.add_informationClick = this.add_informationClick.bind(this);
  }

  addNotification = (tittle_p, message_p, level_p) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      title: tittle_p,
      message: message_p,
      level: level_p,
      autoDismiss: 2.5,
      position: 'tc'
    });
  };

  add_informationClick(event) {
        event.preventDefault();

        if (!/^[1,2,5,6,8,9][0-9]{8}$/.test(this.state.nif)) {
            this.addNotification('Error', 'NIF invalid!', 'error');
            return false;
        }
        else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            this.addNotification('Error', 'E-Mail invalid!', 'error');
            return false;
        }

        axios.post( '/api/candidate', {
          nome: this.state.name,
          telefone:  this.state.phone,
          email: this.state.email,
          nif: this.state.nif,
          address: this.state.address,
        })
        .then(response => {
          this.setState({ name: '', email: '', nif: '', address: '', phone: '' });
          this.addNotification('Sucess', 'Candidate added successfully', 'success');
        })
        .catch(error => {
          this.addNotification('Error', 'Unknown error', 'error');
          console.log(error);
        });
       }

       changename = (obj) => {
         this.setState({ name: obj.target.value });
       }

       changeemail = (obj) => {
         this.setState({ email: obj.target.value });
       }

       changenif = (obj) => {
         this.setState({ nif: obj.target.value });
       }

       changeaddress = (obj) => {
         this.setState({ address: obj.target.value });
       }

       changephone = (obj) => {
         this.setState({ phone: obj.target.value });
       }

  render(){
    return(
        <div className="content">
        <NotificationSystem ref={this.notificationSystem} />
        <form
                  onSubmit={this.add_informationClick} >
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Name",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Name",
                    onChange: this.changename,
                    value: this.state.name,
                    required: true
                  },
                  {
                    label: "Email address",
                    type: "email",
                    bsClass: "form-control",
                    placeholder: "Email",
                    onChange: this.changeemail,
                    value: this.state.email,
                    required: true
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "NIF",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "NIF",
                    onChange: this.changenif,
                    value: this.state.nif,
                    required: true,
                    minLength: 9,
                    maxLength: 9
                  },
                  {
                    label: "Contact",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Contact",
                    onChange: this.changephone,
                    value: this.state.phone,
                    required: true
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                properties={[
                  {
                    label: "Adress",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Adress",
                    onChange: this.changeaddress,
                    value:  this.state.address,
                    required: true,
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                properties={[
                  {
                    label: "Locality",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Locality",
                    value:  this.state.locality,
                    onChange: this.changelocality,
                    required: true,
                  }
                ]}
              />
              <Col md={2} mdOffset={7}>
              <a href="/recruit/candidates"><Button bsStyle="default" pullRight fill>Cancel</Button></a>
              </Col>
              <Col md={3}>
              <Button bsStyle="success" type="submit" pullRight fill >Add Candidate</Button>
              </Col>
              <div className="clearfix" />
            </form>
        </div>
    );
  }
}

export default function NewCandidate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New Candidate'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewCandidateClass />
          </main>
        </div>
    );
}
