import { Link } from "react-router-dom";
import React from 'react'
import PropTypes from "prop-types";
import List from '@material-ui/core/List'
import { withStyles } from "@material-ui/core/styles";
import './sidebar.css';

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import PhonelinkRingOutlinedIcon from '@material-ui/icons/PhonelinkRingOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const styles = theme => ({
    sidebarItemIcon: {
      color: '#C5C5C5',
      paddingLeft: '12px'
    },
    sidebarItemIconCurrent: {
        color: 'aqua',
        paddingLeft: '12px'
    },
    sidebarHeaderIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: '#C5C5C5',
        float: 'right',
      },
    sidebarItemText: {
        color: '#C5C5C5',
        paddingLeft: '0px',
    },
    sidebarItemTextCurrent: {
        color: 'aqua',
        paddingLeft: '0px',
    }
  });

function Sidebar(props) {
    const { classes } = props;

    console.log("Classe=",props.currentPage);

    const menu = [
        // ERP -> Submenus
        {name: 0, label: 'ERP', route: '', items: [
            { name: 1, label: 'Human Resources', route: '/hr', Icon: AccountCircleOutlinedIcon },
            { name: 2, label: 'Inventory', route: '/inventory', Icon: WorkOutlineOutlinedIcon},
            { name: 3, label: 'Sales', route: '/sales', Icon: AddShoppingCartOutlinedIcon},
            { name: 4, label: 'Purchase', route: '/purchase', Icon: ShoppingBasketOutlinedIcon},
            { name: 5, label: 'Finance & Accounting', route: '/fa', Icon: EuroOutlinedIcon},
            { name: 6, label: 'Recruitment', route: '/recruit', Icon: PersonAddOutlinedIcon},
        ]},
        // CRM -> Submenus
        {name: 7, label: 'CRM', route: '', items: [
            { name: 8, label: 'Contacts', route: '/contacts', Icon: PeopleOutlineOutlinedIcon },
            { name: 9, label: 'Leads', route: '/leads', Icon: RecordVoiceOverOutlinedIcon},
            { name: 10, label: 'Analytics', route: '/analytics', Icon: TrendingUpOutlinedIcon},
            { name: 11, label: 'Marketing', route: '/marketing', Icon: EmojiEventsOutlinedIcon},
            { name: 12, label: 'Social Media', route: '/sm', Icon: PhonelinkRingOutlinedIcon},
            { name: 13, label: 'Sales Data', route: '/sd', Icon: ReceiptOutlinedIcon},
            { name: 14, label: 'Performance', route: '/performance', Icon: EqualizerOutlinedIcon},
            { name: 15, label: 'Email Marketing', route: '/em', Icon: EmailOutlinedIcon},
            { name: 16, label: 'Reports', route: '/reports', Icon: ErrorOutlineOutlinedIcon},
        ]}
    ];
    
    return (
        <div className="sidebar">
            <>
            <div className="sidebar-header">
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h1 className="sidebar-header-title">ASAI</h1>
            </Link>
            </div>
            <hr className="sidebar-line-detail" />
            </>
            <List disablePadding>
             
                {menu.map(({label, name, items, ...rest }) => (

                    <React.Fragment key={label}>                     
                    <ListItem>
                        <ListItemText className={'sidebar-item-header'}>{label}</ListItemText>
                    </ListItem>
                    
                    {Array.isArray(items) ? (
                        items.map(({label, name, Icon, route, ...rest }) => (
                            
                            <Link key={label} to={route} style={{ textDecoration: 'none' }}>
                                {console.log(name," - ",props.currentPage)}
                                <ListItem button {...rest}>
                                    <ListItemIcon><Icon className={ name === props.currentPage ? classes.sidebarItemIconCurrent : classes.sidebarItemIcon } /></ListItemIcon>
                                    <ListItemText className={ name === props.currentPage ? classes.sidebarItemTextCurrent : classes.sidebarItemText }>{label}</ListItemText>
                                </ListItem>
                            </Link>
                        ))
                    ) : null }
                    </React.Fragment>
                ))}
                
            </List>
        </div>
    )
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(Sidebar);