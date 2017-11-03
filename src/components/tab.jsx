import React from 'react';
import { Tab } from 'semantic-ui-react';

const BottomTab = () => (
  <Tab menu={{ attached: 'bottom', secondary: true, fluid: true, pointing: true }} panes={panes} />
)

const panes = [
  {menuItem: 'Home', render: () => <Tab.Pane content="Hello, I am Tab 1" />},
  {menuItem: 'Polls', render: () => <Tab.Pane content="Hello, I am Tab 2" />},
  {menuItem: 'Cicles', render: () => <Tab.Pane content="Hello, I am Tab 3" />},
  {menuItem: 'Profile', render: () => <Tab.Pane content="Hello, I am Tab 4" />},
]

export default BottomTab