import React from 'react'
import { Tab } from 'semantic-ui-react'

import PollList from './Poll/PollList.jsx';
import CircleList from './Circle/CircleList.jsx';


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

const Home = () => (
  <Tab menu={{ widths: 2, secondary: true, pointing: true }} panes={panes} />
)

export default Home