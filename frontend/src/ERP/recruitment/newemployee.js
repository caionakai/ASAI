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
import {URL} from '../../Variables.jsx'
import axios from 'axios';

var candidate_id_prop;


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
notificationSystem = React.createRef();
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

  componentWillMount() {
          axios.get( URL + '/erp/jobtype')
          .then(response => {
            const data = response.data;
            this.setState({ jobs: data});
          })
          .catch(function (error) {
            console.log(error);
          })

          axios.get( URL + '/erp/candidate/' + candidate_id_prop)
          .then(response => {
            const data = response.data.res;
            this.setState({  name: data.name, email: data.email, nif: data.nif, address: data.address, phone: data.phone});
          })
          .catch(function (error) {
            console.log(error);
          })
      }

  add_informationClick(event) {
        event.preventDefault();

        axios.post(URL + '/erp/employee', {
          name: this.state.name,
          phone:  this.state.phone,
          email: this.state.email,
          nif: this.state.nif,
          address: this.state.address,
          job_id: this.state.jobid
        })
        .then(response => {
          this.addNotification('Sucess', 'Employee added successfully', 'success');
        })
        .catch(error => {
          this.addNotification('Error', 'Unknown error', 'error');
          console.log(error);
        });
       }

       changebegincontract = (obj) => {
         this.setState({ begincontract: obj.target.value });
       }

       changeendcontract = (obj) => {
         this.setState({ endcontract: obj.target.value });
       }

       changejob = (obj) => {
         this.setState({ jobid: obj.target.value.id });
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
                    value: this.state.name,
                    disabled: true
                  },
                  {
                    label: "Email address",
                    type: "email",
                    bsClass: "form-control",
                    value: this.state.email,
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
                    value: this.state.nif,
                    disabled: true
                  },
                  {
                    label: "Contact",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Contact",
                    value: this.state.phone,
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
                    value: this.state.address,
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
              <p>  { this.state.jobs &&
              <CustomDropDownList callback={this.changejob}  data={this.state.jobs} dateKey="id" dataText="designation"/>}
              </p>

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

export default function NewEmployee(p) {
    const classes = useStyles();
    candidate_id_prop = p.match.params.id;

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
