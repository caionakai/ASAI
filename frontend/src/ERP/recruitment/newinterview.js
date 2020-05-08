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
import {URL} from '../../Variables.jsx'


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

class NewInterviewClass extends React.Component{
notificationSystem = React.createRef();
  constructor(props)
  {
    super(props)
    this.state = { hour: '',  date: ''};
     this.add_informationClick = this.add_informationClick.bind(this);
  }

  componentWillMount() {
          axios.get( URL + '/erp/employee')
          .then(response => {
            const data = response.data;
            this.setState({ employee: data});
          })
          .catch(function (error) {
            console.log(error);
          })

          axios.get( URL + '/erp/candidate/' + 2)
          .then(response => {
            const data = response.data;
            this.setState({ candidate: data.res.name});
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

  add_informationClick(event) {
        event.preventDefault();

        axios.post(URL + '/erp/interview', {
          candidate_id: 2,
          employee_id:  this.state.employee,
          date: this.state.date,
          time: this.state.hour
        })
        .then(response => {
          this.setState({ employee: '', date: '', hour: '' });
          this.addNotification('Sucess', 'Interview added successfully', 'success');
        })
        .catch(error => {
          this.addNotification('Error', 'Unknown error', 'error');
          console.log(error);
        });
       }

       changeemployee = (obj) => {
         this.setState({employee: obj.target.value.id});
       }

       changedate = (obj) => {
         this.setState({ date: obj.target.value });
       }

       changehour = (obj) => {
         this.setState({ hour: obj.target.value });
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
                    label: "Candidate",
                    type: "text",
                    bsClass: "form-control",
                    value: this.state.candidate,
                    disabled : true
                  }
                ]}
              />
              <label className="control-label">Employee</label>
              <p>
                { this.state.employee &&
              <CustomDropDownList callback={this.changeemployee}  data={this.state.employee} dateKey="id" dataText="name"/>
                }
              </p>

              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Date",
                    type: "date",
                    required:true,
                    bsClass: "form-control",
                    onChange: this.changedate
                  },
                  {
                    label: "Hour",
                    type: "time",
                    required:true,
                    bsClass: "form-control",
                    onChange: this.changehour
                  }
                ]}
              />

              <Col md={2} mdOffset={7}>
              <a href="/recruit/candidates"><Button bsStyle="default" >Cancel</Button></a>
              </Col>
              <Col md={3}>
              <Button bsStyle="success" type="submit"  >Add Interview</Button>
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
              <NewInterviewClass />
          </main>
        </div>
    );
}
