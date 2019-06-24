import React from 'react';
import ReactDOM from 'react-dom';
import Category from './category';
import Fixture from '../../fixtures/fixtures'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const category = Fixture.trafus_categories[0]
  const expenses = [...Fixture.trafus_expenses]
  ReactDOM.render(
    <BrowserRouter>
        <Category category={category} expenses={expenses} />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
