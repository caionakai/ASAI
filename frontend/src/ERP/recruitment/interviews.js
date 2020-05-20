import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import AddIcon from '@material-ui/icons/Add';
import {URL} from '../../Variables.jsx'
import axios from 'axios';
import DoneIcon from '@material-ui/icons/Done';



function nameFormater(cell, row, rowIndex, formatExtraData) {
  var candidate_name;
    if (row.employee_name === null)
      candidate_name = "employee 1";
    else
      candidate_name = row.employee_name;
     return (
           <div> {candidate_name} </div>
 ); }

function InterviewDone(id)
{
        axios.put( URL + '/erp/interview/'+id, {
          isDone: 1
              } )
        .then(response => {
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        })
}

 function completeFormatter(cell, row, rowIndex, formatExtraData) {
      return (
            <div onClick={event =>  InterviewDone(row.id)}
                style={{ textAlign: "center",
                   cursor: "pointer",
                  lineHeight: "normal" }}>
                       <DoneIcon
                         style={{ fontSize: 20 }}
                        />
            </div>
  ); }

  const selectOptions = {
    1: '',
    0: ''
  };

const columns = [
  {
  dataField: 'candidate_name',
  text: 'Candidate',
  filter: textFilter()
  },
  {
  dataField: 'employee_name',
  text: 'Employee',
  formatter: nameFormater,
  filter: textFilter()
  },
  {
  dataField: 'date',
  text: 'Date'
  },
  {
  dataField: 'time',
  text: 'Time'
},
  {
  dataField: 'completed',
  text: "Completed ?",
  formatter: completeFormatter,
  headerAttrs: { width: 120 }
},
{
  dataField: 'isDone.data',
  text: "",
  formatter: cell => selectOptions[cell],
  filter: textFilter({
  defaultValue: 0,
  hidden:true,
  })
}
];



function rankFormatter(cell, row, rowIndex, formatExtraData) {
     return (
           <div onClick={event =>  window.location.href='/recruit/newreport/' + row.id}
               style={{ textAlign: "center",
                  cursor: "pointer",
                 lineHeight: "normal" }}>
                      <AddIcon
                        style={{ fontSize: 20 }}
                       />
           </div>
 ); }


const columns2 = [
  {
  dataField: 'candidate_name',
  text: 'Candidate',
  filter: textFilter()
  },
  {
  dataField: 'employee_name',
  text: 'Employee',
  formatter: nameFormater,
  filter: textFilter()
  },
  {
  dataField: 'date',
  text: 'Date'
  },
  {
  dataField: 'time',
  text: 'Time'
},

  {
  dataField: 'new',
  text: "Add report",
  formatter: rankFormatter,
  headerAttrs: { width: 100 }
},
{
  dataField: 'isDone.data',
  text: "",
  formatter: cell => selectOptions[cell],
  filter: textFilter({
  defaultValue: 1,
  hidden:true,
  })
},
{
  dataField: 'isEvaluated.data',
  text: "",
  formatter: cell => selectOptions[cell],
  filter: textFilter({
  defaultValue: 0,
  hidden:true,
  })
}
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


  class InterviewClass extends React.Component{

    constructor(props) {
              super(props);
              this.state = { interview: [] };
      }

      componentWillMount() {
              axios.get( URL + '/erp/interview/')
              .then(response => {
                this.setState({ interview: response.data });
              })
              .catch(function (error) {
                console.log(error);
              })
          }

    render(){
      return(
        <div className="content">
        <h1>Interviews</h1>
      <BootstrapTable keyField='id' data={ this.state.interview } columns={ columns }
      pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />

      <p></p>

      <h1>Waiting report</h1>
    <BootstrapTable keyField='id' data={ this.state.interview  } columns={ columns2 }
    pagination={ paginationFactory() } filter={ filterFactory() } filterPosition="top" />
        </div>
      );
    }
  }

export default function Interviews() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Interviews'}/>
          <Sidebar currentPage={6} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <InterviewClass />
          </main>
        </div>
    );
}
