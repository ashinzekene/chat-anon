import React from 'react'
import { Tab } from 'semantic-ui-react'
// import { Route, Switch } from 'react-router-dom';

import Poll from './Poll.jsx';
import Circle from './Circle.jsx';
// import PollList from './Poll/PollList.jsx';
// import CircleList from './Circle/CircleList.jsx';


const panes = [
  { menuItem: 'Circles', render: () => (
      <Circle />
    )
  },
  { menuItem: 'Polls', render: () => (
     <Poll /> 
    )
  },
]

const TabExampleLoading = () => (
  <Tab  menu={{ widths: 2, secondary: true, pointing: true }} panes={panes} />
)

export default TabExampleLoading