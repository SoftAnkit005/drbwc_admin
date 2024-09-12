import { useState } from 'react';
import { Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import './settings.scss'
import StoreSetting from './settingtabs/StoreSetting';
import PaymentSetting from './settingtabs/PaymentSetting';
import ShippingSetting from './settingtabs/ShippingSetting';
import TaxSetting from './settingtabs/TaxSettings';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('1'); // Step 1: State for active tab

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab); // Step 2: Update state when tab is clicked
    }
  };

  return (
    <Card>
      <CardBody>
        <Nav tabs>
          <NavItem>
            <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => toggle('1')} > Store Setting </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => toggle('2')} > Payment Setting </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => toggle('3')} > Shipping Setting </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === '4' ? 'active' : ''} onClick={() => toggle('4')} > Tax Setting </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <StoreSetting />
          </TabPane>
          <TabPane tabId="2">
            <PaymentSetting />
          </TabPane>
          <TabPane tabId="3">
            <ShippingSetting />
          </TabPane>
          <TabPane tabId="4">
            <TaxSetting pageName="tax" />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default Setting;
