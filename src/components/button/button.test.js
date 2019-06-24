import React from 'react';
import ReactDOM from 'react-dom';
import ButtonTemplate from './button';

it('button renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonTemplate type="some_type" className="some_className" label="some_label"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
