import React from 'react';
import Sidebar from './Components/SideBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Hr from './ERP/human_resources'
import Sales from './ERP/sales'
import Inventory from './ERP/inventory'
import Purchase from './ERP/purchase'
import FinanceAcc from './ERP/finance_accounting'
import Recruit from './ERP/recruitment'

import Contacts from './CRM/contacts'
import Leads from './CRM/leads'
import Analytics from './CRM/analytics'
import Marketing from './CRM/marketing'
import SocialMedia from './CRM/social_media'
import SalesData from './CRM/sales_data'
import Performance from './CRM/performance'
import EmailMarketing from './CRM/email_marketing'
import Reports from './CRM/reports'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/hr" exact component={() => <Hr />}></Route>
        <Route path="/sales" exact component={() => <Sales />}></Route>
        <Route path="/inventory" exact component={() => <Inventory />}></Route>
        <Route path="/purchase" exact component={() => <Purchase />}></Route>
        <Route path="/fa" exact component={() => <FinanceAcc />}></Route>
        <Route path="/recruit" exact component={() => <Recruit />}></Route>

        
        <Route path="/contacts" exact component={() => <Contacts />}></Route>
        <Route path="/leads" exact component={() => <Leads />}></Route>
        <Route path="/analytics" exact component={() => <Analytics />}></Route>
        <Route path="/marketing" exact component={() => <Marketing />}></Route>

        
        <Route path="/sm" exact component={() => <SocialMedia />}></Route>
        <Route path="/sd" exact component={() => <SalesData />}></Route>
        <Route path="/performance" exact component={() => <Performance />}></Route>
        <Route path="/em" exact component={() => <EmailMarketing />}></Route>
        <Route path="/reports" exact component={() => <Reports />}></Route>
        
        <Route path="/" exact component={() => <Sidebar />}></Route>
        
      </Switch>
    </Router>
  )
}

export default App