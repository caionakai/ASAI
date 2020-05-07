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

class NewServiceTypeClass extends React.Component{
  notificationSystem = React.createRef();
  constructor(props)
  {
    super(props)
    this.state = {description: ''};

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

        axios.post( '/api/service_type', {
          description: this.state.description
        })
        .then(response => {
          this.setState({ description: ''});
          this.addNotification('Success', 'Service type added successfully', 'success');
        })
        .catch(error => {
          this.addNotification('Error', 'Unknown error', 'error');
          console.log(error);
        });
       }

       changedescription = (obj) => {
         this.setState({ description: obj.target.value });
       }


  render(){
    return(
        <div className="content">
        <NotificationSystem ref={this.notificationSystem} />
        <form
                  onSubmit={this.add_informationClick} >
              <FormInputs
                ncols={["col-md-6"]}
                properties={[
                  {
                    label: "Description",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Description",
                    onChange: this.changedescription,
                    value: this.state.description,
                    required: true
                  }
                ]}
              />
              <Col md={2} mdOffset={7}>
              <a href="/performance/service_types"><Button bsStyle="default">Cancel</Button></a>
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

export default function NewServiceType() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New Service Type'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewServiceTypeClass />
          </main>
        </div>
    )};