import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { Col } from "react-bootstrap";
import { FormInputs } from "../../Components/FormInputs/FormInputs.jsx";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import CustomDropDownList from '../../Components/CustomDropDownList/CustomDropDownList.jsx';

import axios from 'axios';

const jobs = [
  {"id": 1, "name": "counting"},
  {"id": 2, "name": "warehouse"},
  {"id": 3, "name": "delivery"}
];

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
/*
        axios.post('/api/employee', {
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
        });*/
       }

       changebegincontract = (obj) => {
         this.setState({ begincontract: obj.target.value });
       }

       changeendcontract = (obj) => {
         this.setState({ endcontract: obj.target.value });
       }

       changejob = (obj) => {
         this.setState({ job: obj.target.value });
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
                    value: "employee 40",
                    disabled: true
                  },
                  {
                    label: "Email address",
                    type: "email",
                    bsClass: "form-control",
                    placeholder: "Email",
                    value: "asdasd@asdasd.com",
                    disabled: true
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
                    value:"9999999",
                    disabled: true
                  },
                  {
                    label: "Contact",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Contact",
                    value: "999999999",
                    disabled: true
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
                    value:  "asdasd a12318 asdasdasd",
                    disabled: true
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Begin of contract",
                    type: "date",
                    bsClass: "form-control",
                    placeholder: "begin of contract",
                    required: true,
                    onChange: this.changebegincontract
                  },
                  {
                    label: "End of contract",
                    type: "date",
                    bsClass: "form-control",
                    placeholder: "end of contract",
                    required: true,
                    onChange: this.changeendcontract
                  }
                ]}
              />

              <label className="control-label">Job</label>
              <p><CustomDropDownList callback={this.changejob}  data={jobs} dateKey="id" dataText="name"/></p>

              <Col md={2} mdOffset={7}>
              <a href="/recruit/hire"><Button bsStyle="default">Cancel</Button></a>
              </Col>
              <Col md={3}>
              <Button bsStyle="success" type="submit">Add Employee</Button>
              </Col>
              <div className="clearfix" />
            </form>
        </div>
    );
  }
}

export default function NewEmployee() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'New employee'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <NewCandidateClass />
          </main>
        </div>
    );
}
