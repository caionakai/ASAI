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
import {URL} from '../../Variables.jsx'

var interview_id_prop;

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

class NewReportClass extends React.Component{
notificationSystem = React.createRef();
  constructor(props)
  {
    super(props)
    this.state = { name: '', email: '', isActive: 0};

     this.add_informationClick = this.add_informationClick.bind(this);
  }

  componentWillMount() {
          axios.get( URL + '/erp/interview/'+interview_id_prop)
          .then(response => {
            const data = response.data;

            this.setState({ name: data.candidate_name, email: data.candidate_email});
          })
          .catch(function (error) {
            console.log(error);
          })
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

  changeactive = (obj) => {
    if(obj.target.checked){
      this.setState({ isActive: 1});
      }
    else {
        this.setState({ isActive: 0});
    }
  }

  add_informationClick(event) {
        event.preventDefault();

        axios.put( URL + '/erp/interview/'+interview_id_prop, {
          isPassed: this.state.isActive,
          isEvaluated: 1
              } )
        .then(response => {
            this.addNotification('Sucess', 'Report added successfully', 'success');
        })
        .catch(function (error) {
          console.log(error);
        })

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
                    label: "Candidate",
                    type: "text",
                    bsClass: "form-control",
                    value: this.state.name,
                    disabled : true
                  },
                  {
                    label: "Email address",
                    type: "email",
                    bsClass: "form-control",
                    disabled : true,
                    value: this.state.email
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Report:  ",
                    type: "file",
                    bsClass: "form-control",
                    required: true
                  },
                  {
                    label: "Passed",
                    type: "checkbox",
                    bsClass: "form-control",
                    onClick: this.changeactive
                  }
                ]}
              />

              <Col md={2} mdOffset={7}>
              <a href="/recruit/interviews"><Button bsStyle="default">Cancel</Button></a>
              </Col>
              <Col md={3}>
              <Button bsStyle="success" type="submit">Submit report</Button>
              </Col>
              <div className="clearfix" />
            </form>
        </div>
    );
  }
}

export default function NewCandidate(p) {
    const classes = useStyles();

    interview_id_prop=p.match.params.id

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New Report'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewReportClass />
          </main>
        </div>
    );
}
