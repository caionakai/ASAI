import React from 'react';
import Sidebar from './Components/SideBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Hr from './ERP/human_resources'
import Sales from './ERP/sales'
import Inventory from './ERP/inventory'
import Purchase from './ERP/purchase'
import FinanceAcc from './ERP/finance_accounting'
import Recruit from './ERP/recruitment/index'
import Candidates from './ERP/recruitment/candidates'
import NewCandidate from './ERP/recruitment/newcandidate'
import Interview from './ERP/recruitment/interviews'
import NewInterview from './ERP/recruitment/newinterview'
import NewReport from './ERP/recruitment/newreport'
import Hire from './ERP/recruitment/hire'
import NewEmployee from './ERP/recruitment/newemployee'


import Contacts from './CRM/contacts'
import Leads from './CRM/leads'
import Analytics from './CRM/analytics'
import Marketing from './CRM/marketing'
import SocialMedia from './CRM/social_media'
import SalesData from './CRM/sales_data'
import Performance from './CRM/performance'
import Feedbacks from './CRM/performance/feedbacks'
import NewFeedback from './CRM/performance/new_feedback'
import NewServiceType from './CRM/performance/new_service_type'
import NewService from './CRM/performance/new_service'
import ServiceTypes from './CRM/performance/service_types'
import Services from './CRM/performance/services'
import Clients from './CRM/performance/clients'
import NewClient from './CRM/performance/new_client'
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
        <Route path="/recruit/candidates" exact component={() => <Candidates />}></Route>
        <Route path="/recruit/interviews" exact component={() => <Interview />}></Route>
        <Route path="/recruit/newcandidate" exact component={() => <NewCandidate />}></Route>
        <Route path="/recruit/newinterview/:id" exact component={() => <NewInterview />}></Route>
        <Route path="/recruit/newreport/:id" exact component={() => <NewReport />}></Route>
        <Route path="/recruit/hire" exact component={() => <Hire />}></Route>
        <Route path="/recruit/newemployee/:id" exact component={() => <NewEmployee />}></Route>



        <Route path="/contacts" exact component={() => <Contacts />}></Route>
        <Route path="/leads" exact component={() => <Leads />}></Route>
        <Route path="/analytics" exact component={() => <Analytics />}></Route>
        <Route path="/marketing" exact component={() => <Marketing />}></Route>


        <Route path="/sm" exact component={() => <SocialMedia />}></Route>
        <Route path="/sd" exact component={() => <SalesData />}></Route>
        <Route path="/performance" exact component={() => <Performance />}></Route>
        <Route path="/performance/feedbacks" exact component={() => <Feedbacks />}></Route>
        <Route path="/performance/services" exact component={() => <Services />}></Route>
        <Route path="/performance/clients" exact component={() => <Clients />}></Route>
        <Route path="/performance/service_types" exact component={() => <ServiceTypes />}></Route>
        <Route path="/performance/new_client" exact component={() => <NewClient />}></Route>
        <Route path="/performance/new_feedback" exact component={() => <NewFeedback />}></Route>
        <Route path="/performance/new_service" exact component={() => <NewService />}></Route>
        <Route path="/performance/new_service_type" exact component={() => <NewServiceType />}></Route>
        <Route path="/em" exact component={() => <EmailMarketing />}></Route>
        <Route path="/reports" exact component={() => <Reports />}></Route>

        <Route path="/" exact component={() => <Sidebar />}></Route>

      </Switch>
    </Router>
  )
}

export default App
