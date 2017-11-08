import React from 'react'
import { Tab } from 'semantic-ui-react'

import PollList from './PollList.jsx';
import CircleList from './CircleList.jsx';

const panes = [
  { menuItem: 'Polls', render: () => (
      <PollList />
    )
  },
  { menuItem: 'Circles', render: () => (
     <CircleList />
    )
  },
]

const Home = (props) => (
  <Tab onTabChange={ props.handleTabChange } menu={{ widths: 2, secondary: true, pointing: true }} panes={panes} />
)

export default Home
