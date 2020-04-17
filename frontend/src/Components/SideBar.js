import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from "react-router-dom";
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
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1D1D1D"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#aqua',
    padding: theme.spacing(3),
  },
  sidebarItemText: {
    color: '#C5C5C5',
  },
  sidebarItemTextCurrent: {
    color: 'aqua',
  },
  sidebarItemIcon: {
    color: '#C5C5C5',
  },
  sidebarItemIconCurrent: {
      color: 'aqua',
  },
  dividerStyle: {
    backgroundColor: '#C5C5C5',
  },
  headerText: {
    color: '#C5C5C5'
  }
  
}));

function SideB({ currentPage, ...rest}) {
    const classes = useStyles();

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
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography variant={'h4'} style={{color: '#ffffff'}}>ASAI</Typography></div>
        <Divider className={classes.dividerStyle} variant={"middle"} />
        <List>
          {menu.map(({label, name, items, ...rest }) => (
            <React.Fragment key={label}>
            <ListItem>
              <ListItemText className={classes.headerText}>{label}</ListItemText>
            </ListItem>
            
            {Array.isArray(items) ? (
                items.map(({label, name, Icon, route, ...rest }) => (
                    <Link key={label} to={route} style={{ textDecoration: 'none' }}>
                        <ListItem button {...rest}>
                            <ListItemIcon><Icon className={ name === currentPage ? classes.sidebarItemIconCurrent : classes.sidebarItemIcon } /></ListItemIcon>
                            <ListItemText className={ name === currentPage ? classes.sidebarItemTextCurrent : classes.sidebarItemText }>{label}</ListItemText>
                        </ListItem>
                    </Link>
                ))
            ) : null }
             <Divider className={classes.dividerStyle} variant={"inset"} />
            </React.Fragment>

          ))}
        </List>
      </Drawer>

    );
}

export default SideB;