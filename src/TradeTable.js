import React from 'react';
import constants from './_constants'


function formattedTime(date) {
  date = new Date(Number(date+'000'));
  var str = '';
  function zeroPad(val){return (`0${val}`).slice(-2);}
  str+=zeroPad(date.getHours())+':'+zeroPad(date.getMinutes())+':'+zeroPad(date.getSeconds());
  return str;
}


const Trade = (props) => {
  return (
    <tr className={props.val[3]}>
      <td>{formattedTime(props.val[0])}</td>
      <td>{props.val[1]}</td>
      <td>{props.val[2]}</td>
    </tr>
  );  
}

/*
 * TradeTable
 * Props:
 *   exchange: name + currency (eg BTCUSD)
 */

class TradeTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "arr": [] // array of top 10 trades
    };
  }

  componentDidMount(){
    var conn = new WebSocket(constants.url.Websocket);
    var key = (this.props.exchange).toUpperCase();
    conn.onopen = function() {
      conn.send(JSON.stringify({"event":"subscribe", "channel":"trades", "pair":key}));
    };
    conn.onmessage = ms => {
      var msg = JSON.parse(ms.data);
      if(msg.length && msg.length === 2 && msg[1] != "hb") {
        msg = msg[1];
        msg = msg.splice(15).reverse();
        msg = msg.map(t => {
          return [
            t[1], // time
            (new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(parseFloat(t[2]))), // price
            (new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(t[3]>0?t[3]:(t[3]*-1))),
            (t[3] > 0 ? "inc" : "dec"),
            t[0]
          ];
        });
        this.setState({
          "arr": msg
        });
      }
      else if(msg.length && msg.length === 6) {
        var trades = this.state.arr;
        trades.unshift([
          msg[3], // time
          (new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(msg[4])), // price
          (new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(msg[5]>0?msg[5]:(msg[5]*-1))),
          (msg[5] > 0 ? "inc" : "dec"),
          msg[2]
        ]);
        trades.pop();
        this.setState({
          "arr": trades
        });
      }
    };
    window.addEventListener("beforeunload", (ev) => { conn.close(); });
  }

  render() {
    const arr = this.state.arr;

    if(arr.length === 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>TIME</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Loading...</td></tr>
          </tbody>
        </table>
      );
    }
    else {
      return (
        <table>
          <thead>
            <tr>
              <th>TIME</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((item) => { return <Trade key={item[4]} val={item} />; })}
          </tbody>
        </table>
      );
    }
  }
}

export default TradeTable
