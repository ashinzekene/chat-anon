import React from "react";
import { shallow } from "enzyme";
import Home from '../components/Home'

describe('<Home />', () => {
  it('should render the homepage', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find('div').text()).toBe("Polley")
  })
})