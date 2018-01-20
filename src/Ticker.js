import React from 'react';
import constants from './_constants'

class Ticker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      last: '-', // values of currencies passed
      vol : '-',
      per : '-'
    };
  }

  componentDidMount(){
    var conn = new WebSocket(constants.url.Websocket);
    var key = (this.props.name+''+this.props.currency).toUpperCase();
    conn.onopen = function() {
      conn.send(JSON.stringify({"event":"subscribe", "channel":"ticker", "pair":key}));
    };
    conn.onmessage = msg => {
      var msg = JSON.parse(msg.data);
      if(msg.event === void 0 && msg[1] != "hb") {
        this.setState({
          per : (msg[6]).toFixed(2),
          last: msg[7],
          vol : msg[8]
        });
      }
    };
    window.addEventListener("beforeunload", (ev) => { conn.close(); });
  }

  render() {
    const name = this.props.name;
    const currency = this.props.currency;
    var l = this.state.last;
    l = (new Intl.NumberFormat('en-US', { maximumFractionDigits: (l > 0 ? 2 : 6) }).format(l));
    var diff = this.state.per;

    if(diff === '-')
      return (
        <tr>
          <td>{name}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    diff = (new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(this.state.per));
    return (
      <tr>
        <td>{name}</td>
        <td>{l}<span className="curr">{currency}</span></td>
        {diff>0 ? (<td className="inc">{diff}%</td>) : (<td className="dec">{(diff*-1)}%</td>)}
        <td>{(new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(this.state.vol))}</td>
      </tr>
    );
  }
}

export default Ticker
