import React from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from 'react-bootstrap';
import { CardList } from  './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './leads.css'


const classes = makeStyles((theme) => ({
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


class Leads extends React.Component {
    constructor() {
      super();

      var data = localStorage.getItem('myData');
      data = JSON.parse(data);

      this.state = {
        leadsname: [
          data,
        {
            id: 1,
            lead: 'X-Ray',
            company: 'Microsoft',
            person: 'Calin',
            age: '23',
            gender: 'Male',
            phone: '078321456',
            description: 'Good lead'
        },
        {
            id: 2,
            lead: 'Speed Computer',
            company: 'Google',
            person: 'Filip',
            age: '23',
            gender: 'Male',
            phone: '078321456',
            description: 'Lets see'
        },
        {
          id: 3,
          lead: 'Earthquake Machine',
          company: 'Google',
          person: 'Samene',
          age: '25',
          gender: 'Female',
          phone: '078321456',
          description: 'For everyone'
        },
        {
          id: 4,
          lead: 'Thought Camera',
          company: 'Microsoft',
          person: 'Jhon',
          age: '19',
          gender: 'Male',
          phone: '078321456',
          description: 'Camera'
        },
        {
          id: 5,
          lead: 'Wireless Energy',
          company: 'Enginiering software',
          person: 'Maria',
          age: '45',
          gender: 'Female',
          phone: '078321456',
          description: 'Free Energy for everyone'
        },
        {
          id: 6,
          lead: 'Artificial Tidal Wave',
          company: 'Thoshiba',
          person: 'Zen',
          age: '26',
          gender: 'Male',
          phone: '078321456',
          description: 'Medium'
        },
        {
          id: 7,
          lead: 'Electric-Powered Supersonic Airship',
          company: 'AirForce',
          person: 'Voronin',
          age: '53',
          gender: 'Male',
          phone: '078321456',
          description: 'Air plane'
        },
        {
          id: 8,
          lead: 'Death Beam',
          company: 'Tesla',
          person: 'Kraig',
          age: '40',
          gender: 'Male',
          phone: '078321456',
          description: 'Mistyc'
        },
        {
          id: 9,
          lead: 'Electro-car',
          company: 'Tesla',
          person: 'Rooney',
          age: '57',
          gender: 'Male',
          phone: '078321456',
          description: 'Very quick'
        }
      ],
        searchField: '',
      };
    }
       

  handleChange = e => {
    this.setState({searchField: e.target.value})
    }
   

  render() {
    const { leadsname, searchField } = this.state;
    const filteredLeadsname = leadsname.filter(leadname =>
      leadname.lead.toLowerCase().includes(searchField.toLowerCase())
      );

    return (
      <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Leads'}/>
          <Sidebar currentPage={9} />
          <main className='leads'>
            <div className={classes.toolbar} />
              <Button bsStyle="primary" href="/leads/newlead">Add</Button>

              <SearchBox
              placeholder='search lead' 
              handleChange={this.handleChange}
              />
          
              <CardList leadsname={filteredLeadsname} />
          </main>
      </div>
    );
  }
}

export default Leads;