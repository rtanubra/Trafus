import React from 'react';
import ReactDOM from 'react-dom';
import CategorySummaryTable from './category_summary';
import Fixtures from  '../../fixtures/fixtures'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const category = Fixtures.trafus_categories[0]
  const expenses = [...Fixtures.trafus_expenses]
  ReactDOM.render(<CategorySummaryTable category={category} expenses={expenses} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
