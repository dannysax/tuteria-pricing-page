import React from 'react';
import ReactDOM from 'react-dom';
import Root from './priceSummary';
import Pricing from './selectPrice';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


ReactDOM.render(
  <Pricing />,
  document.getElementById('pricing-location')
)
