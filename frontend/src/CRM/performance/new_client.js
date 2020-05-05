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

class NewClientClass extends React.Component{
  notificationSystem = React.createRef();
  constructor(props)
  {
    super(props)
    this.state = { name: '', email: '', address: '',  phone: ''};

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

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
            this.addNotification('Error', 'E-Mail invalid!', 'error');
            return false;
        }

        axios.post( '/api/client', {
          nome: this.state.name,
          telefone:  this.state.phone,
          email: this.state.email,
          address: this.state.address,
        })
        .then(response => {
          this.setState({ name: '', email: '', address: '', phone: '' });
          this.addNotification('Success', 'Client added successfully', 'success');
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
                    label: "Contact",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Contact",
                    onChange: this.changephone,
                    value: this.state.phone,
                    required: true
                  },
                  {
                    label: "Address",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Address",
                    onChange: this.changeaddress,
                    value:  this.state.address,
                    required: true,
                  }
                ]}
              />
              <Col md={2} mdOffset={7}>
              <a href="/recruit/clients"><Button bsStyle="default">Cancel</Button></a>
              </Col>
              <Col md={3}>
              <Button bsStyle="success" type="submit">Save</Button>
              </Col>
              <div className="clearfix" />
            </form>
        </div>
    );
  }
}

export default function NewClient() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New Client'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewClientClass />
          </main>
        </div>
    );
}
