import React from 'react';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hr from './pages/ERP/HumanRes/index'
import Sales from './pages/ERP/Sales/index'
import Inventory from './pages/ERP/Inventory/index'
import Purchase from './pages/ERP/Purchase/index'
import FinanceAcc from './pages/ERP/FinanceAcc/index'
import Recruit from './pages/ERP/Recruitment/index'


import Contacts from './pages/CRM/Contacts/index'
import Leads from './pages/CRM/Leads/index'
import Analytics from './pages/CRM/Analytics/index'
import Marketing from './pages/CRM/Marketing/index'

import SocialMedia from './pages/CRM/SocialMedia/index'
import SalesData from './pages/CRM/SalesData/index'
import Performance from './pages/CRM/Performance/index'
import EmailMarketing from './pages/CRM/EmailMarketing/index'
import Reports from './pages/CRM/Reports/index'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/hr" component={() => <Hr />}></Route>
        <Route path="/sales" component={() => <Sales />}></Route>
        <Route path="/inventory" component={() => <Inventory />}></Route>
        <Route path="/purchase" component={() => <Purchase />}></Route>
        <Route path="/fa" component={() => <FinanceAcc />}></Route>
        <Route path="/recruit" component={() => <Recruit />}></Route>

        
        <Route path="/contacts" component={() => <Contacts />}></Route>
        <Route path="/leads" component={() => <Leads />}></Route>
        <Route path="/analytics" component={() => <Analytics />}></Route>
        <Route path="/marketing" component={() => <Marketing />}></Route>

        
        <Route path="/sm" component={() => <SocialMedia />}></Route>
        <Route path="/sd" component={() => <SalesData />}></Route>
        <Route path="/performance" component={() => <Performance />}></Route>
        <Route path="/em" component={() => <EmailMarketing />}></Route>
        <Route path="/reports" component={() => <Reports />}></Route>
        
        <Route path="/" component={() => <Sidebar />}></Route>
        
      </Switch>
    </Router>
  )
}

export default App