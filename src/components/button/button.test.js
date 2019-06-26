import React from 'react';
import ReactDOM from 'react-dom';
import ButtonTemplate from './button';
import {shallow} from 'enzyme';

describe("Button",()=>{
  it('button renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonTemplate type="some_type" className="some_className" label="some_label"/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("runs onClick when button is pressed",()=>{
    const myfx = jest.fn(()=>{
          //do nothing
        })
        const wrapper = shallow(<ButtonTemplate onClick={myfx} />);
        wrapper.find('button').simulate('click');
        expect(myfx.mock.calls.length).toBe(1)
    });
})
