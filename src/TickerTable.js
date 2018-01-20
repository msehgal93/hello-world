import React from 'react';
import Ticker from './Ticker'

const TickerTable = (props) => {
  var list = props.list;
  return (
    <table>
      <thead>
        <tr>
          <th>SYMBOL</th>
          <th>LAST</th>
          <th>24HR</th>
          <th>VOLUME</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item,i) => { return <Ticker key={i} {...item} />; })}
      </tbody>
    </table>
  );
}

export default TickerTable
