import React from 'react'
import {render} from 'react-dom'

import constants from './_constants'

import TickerTable from './TickerTable'
import TradeTable from './TradeTable'

import './css/bootstrap.min.css'
import './css/bootstrap-theme.min.css'
import './css/Table.css'

render(
  (<div className="row">
    <div className="col-xs-4">
      <h3>Trade Table: {constants.defaultPair}</h3>
      <TradeTable exchange={constants.defaultPair} />
    </div>
    <div className="col-xs-4">
      <h3>Ticker</h3>
      <TickerTable list={constants.list} />
    </div>
  </div>),
  document.getElementById('root')
);
