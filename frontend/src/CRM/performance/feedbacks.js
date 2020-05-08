import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


import {URL} from '../../Variables.jsx'
import axios from 'axios';


class FeedbacksClass extends React.Component{

  constructor(props) {
            super(props);
            this.state = { feedbacks: [] };
    }

    componentWillMount() {
            axios.get( URL + '/crm/feedbacks/')
            .then(response => {
              this.setState({ feedbacks: response.data });
            })
            .catch(function (error) {
              console.log(error);
            })
        }

  render(){
    return(
      <div className="content">
        <BootstrapTable keyField='id' data={ this.state.feedbacks } columns={ columns }
        pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />
      </div>
    );
  }
}


const columns = [
  {
  dataField: 'description',
  text: 'Description',
  filter: textFilter()
  },
  {
    dataField: 'evaluation',
    text: 'Evaluation',
    filter: textFilter()
  },
  {
    dataField: 'date',
    text: 'Date'
  },
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

export default function Feedbacks() {
    const classes = useStyles();




    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Feedbacks'}/>
          <Sidebar currentPage={14} />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <FeedbacksClass />

          </main>
        </div>
    );
}
