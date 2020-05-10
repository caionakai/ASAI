import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { Col } from "react-bootstrap";
import { FormInputs } from "../../Components/FormInputs/FormInputs.jsx";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import {URL} from '../../Variables.jsx'
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

class NewFeedbackClass extends React.Component{
notificationSystem = React.createRef();
  constructor(props)
  {
    super(props)
    this.state = { description: '', service_id: 1, evaluation: '', date: ''};

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

        axios.post( URL + '/crm/feedbacks', {
          description: this.state.description,
          service_id: this.state.service_id,
          evaluation: this.state.evaluation,
          date: this.state.date
        })
        .then(response => {
          this.setState({ description: '', service_id: 1, evaluation: '', date: ''});
          this.addNotification('Success', 'Feedback added successfully', 'success');
        })
        .catch(error => {
          this.addNotification('Error', 'Unknown error', 'error');
          console.log(error);
        });
       }

       changedescription = (obj) => {
         this.setState({ description: obj.target.value });
       }
       changeevaluation = (obj) => {
        this.setState({ evaluation: obj.target.value });
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
                    label: "Description",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Description",
                    onChange: this.changedescription,
                    value: this.state.description,
                    required: true
                  },
                  {
                    label: "Date",
                    type: "date",
                    required:true,
                    onChange: this.changedate,
                    bsClass: "form-control"
                  }
                ]}
              />
                <FormInputs
                ncols={["col-md-6"]}
                properties={[
                  {
                    label: "Evaluation",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Evaluation",
                    onChange: this.changeevaluation,
                    value: this.state.evaluation,
                    required: true
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

export default function NewFeedback() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New Feedback'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewFeedbackClass />
          </main>
        </div>
    );
}