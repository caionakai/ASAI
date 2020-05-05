import React from 'react';
//import ReactDOM from 'react-dom';
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

class NewServiceClass extends React.Component{
  notificationSystem = React.createRef();
  constructor(props)
  {
    super(props)
    this.state = {designation: '', idclient: '', idemployee: '', idservicetype: '', date: ''};

     this.add_informationClick = this.add_informationClick.bind(this);
  }

  addNotification = (title_performance, message_performance, level_performance) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      title: title_performance,
      message: message_performance,
      level: level_performance,
      autoDismiss: 2.5,
      position: 'tc'
    });
  };

  add_informationClick(event) {
        event.preventDefault();

        axios.post( '/api/service', {
          designation: this.state.designation,
          idservicetype: this.state.idservicetype,
          idemployee: this.state.idemployee,
          idclient: this.state.idclient,
          date: this.state.date
        })
        .then(response => {
          this.setState({ designation: '', idservicetype: '', idemployee: '', idclient: '', date: ''});
          this.addNotification('Success', 'Service added successfully', 'success');
        })
        .catch(error => {
          this.addNotification('Error', 'Unknown error', 'error');
          console.log(error);
        });
       }
       changeservicetype = (obj) => {
        this.setState({ idservicetype: obj.target.value.id });
       }
       changeemployee = (obj) => {
        this.setState({ idemployee: obj.target.value.id });
       }
       changeclient = (obj) => {
        this.setState({ idclient: obj.target.value.id });
       }
       changedesignation = (obj) => {
        this.setState({ designation: obj.target.value });
      }
      changedate = (obj) => {
        this.setState({ date: obj.target.value });
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
                    label: "Designation",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Designation",
                    onChange: this.changedesignation,
                    value: this.state.designation,
                    required: true
                  },
                  {
                    label: "Date",
                    type: "date",
                    bsClass: "form-control",
                    onChange: this.changedate,
                    value: this.state.date,
                    required: true
                    }
                ]}
              />
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Service Type",
                    type: "text",
                    bsClass: "form-control",
                    onChange: this.changeservicetype,
                    value: "service type x",
                    required: false,
                    disabled: true
                  },
                  {
                    label: "Client",
                    type: "text",
                    bsClass: "form-control",
                    onChange: this.changeclient,
                    value: "client x",
                    required: false,
                    disabled: true
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-6"]}
                properties={[
                  {
                    label: "Employee",
                    type: "text",
                    bsClass: "form-control",
                    onChange: this.changeemployee,
                    value: "employee x",
                    required: false,
                    disabled: true
                  }
                ]}
              />
              <Col md={2} mdOffset={7}>
              <a href="/performance/services"><Button bsStyle="default">Cancel</Button></a>
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

export default function NewService() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New Service'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewServiceClass />
          </main>
        </div>
    )};